package org.launchcode.couchcatbackend.controllers;

import jakarta.transaction.Transactional;
import org.launchcode.couchcatbackend.configuration.AuthenticationConfig;
import org.launchcode.couchcatbackend.data.UserMovieLogRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.UserMovieLog;
import org.launchcode.couchcatbackend.models.dto.UserDetailsDTO;
import org.launchcode.couchcatbackend.services.UserService;
import org.launchcode.couchcatbackend.utils.HTTPResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMovieLogRepository userMovieLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationConfig authenticationConfig;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*TODO: Test: 1. New user is able to register via hard coded data upon form submit;  - SUCCESS!
       2. Second user is able to register via hardcoded data and resolve the suspected cache issue; - SUCCESS!
       3. Form fill: New user is able to register via an actual form submit; - SUCCESS!
       4. Hardcoded: Re-register same email to validate logic is working and we don't allow the same user to register twice; - SUCCESS!
       5. Form fill: Re-register same email to validate logic is working and we don't allow the same user to register twice; - SUCCESS!
       6. Form fill: A second new user is able to register via an actual form submit;  - SUCCESS!
    */
    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> userLogin(@RequestBody User user) {
        return userService.authenticateUser(user);
    }

    //Receives get request from the front end, which includes HTTP header with the credentials, we extract the sessionId
    @GetMapping("/secure")
    public ResponseEntity<User> secureEndpoint(@RequestParam(name = "sessionId", required = false) String sessionId) {
        User loggedInUser = userRepository.findBySessionId(sessionId);
//        if a user with that sessionId exists in the database, that user is assigned to loggedInUser
        //TODO: Possibly update to validate that the sessionId is assigned to the particular user by adding
        // Integer id to the request param and comparing the id of the loggedInUser to the id passed in to verify they are a match
        if (loggedInUser != null) {
            //update last activity - commenting out because not working properly and tabling this as not critical for MVP
            //AuthenticationConfig.updateLastActivityTime(sessionId);
            //returns loggedInUser details but depending on how front end works, we may only need to return a success message
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> logoutUser(@CookieValue(name = "sessionId", required = false) String sessionId) {
//       System.out.println(sessionId);
        if (sessionId == null || sessionId.isEmpty()) {
            return HTTPResponseBuilder.badRequest("Invalid session ID");
        } else {
            return userService.logoutUser(sessionId);
        }
   }

//    @GetMapping("/details/{id}")
//    public User getUserDetailsById(@PathVariable int id) {
//        //  TODO: Update so we are only returning the first name, last name, email and watchlist?? and not the password to display on the profile page
//        Optional<User> result = userRepository.findById(id);
//        if (result.isPresent()) {
//            User user = result.get();
//            return user;
//        }
//
//        return null;
//    }
//    //  TODO: VALIDATE THIS METHOD IS ACTUALLY NOT NEEDED AND DELETE IF SO, IF IT IS NEEDED, REPLACE USERDTO WITH USER
/*NOTES: 1. this uses the URI I set when the user registers "/user/{id}" (no "details), which is what the front end would
pass back to retrieve the information
*/
    @GetMapping("/{id}")
    public ResponseEntity<UserDetailsDTO> getUserDetailsById(@PathVariable Integer id) {
        Optional<User> result = userRepository.findById(id);
        if (result.isPresent()) {
            User user = result.get();
            UserDetailsDTO userDetailsDTO = new UserDetailsDTO(user.getFirstName(), user.getLastName(), user.getEmail());
            return ResponseEntity.ok().body(userDetailsDTO);
        }
        return ResponseEntity.notFound().build();
    }

//    TODO: add some kind of security so you can't delete other users' accounts? change to @RequestBody and you pass in sessionId instead and it deletes user associated with that sessionId?
    @DeleteMapping
    @Transactional
    public ResponseEntity<String> deleteUser(@CookieValue(name = "sessionId", required = false) String sessionId) {
//        Optional<User> result = userRepository.findById(id);
        if (sessionId == null || sessionId.isEmpty()) {
            return HTTPResponseBuilder.badRequest("Invalid session ID");
        } else {
            User user = userRepository.findBySessionId(sessionId);
            System.out.println("user: " + user);
            int id = user.getId();
            String email = user.getEmail();

            List<Movie> watchlist = new ArrayList<>(user.getWatchlist());

            for (Movie movie : watchlist) {
                user.removeFromWatchlist(movie);
            }

            List<UserMovieLog> logEntries = userMovieLogRepository.findByIdUserId(id);
            for (UserMovieLog log : logEntries) {
                userMovieLogRepository.delete(log);
            }

            userRepository.save(user);
            userService.logoutUser(sessionId);
            userRepository.deleteById(id);
//            return new ResponseEntity(HttpStatus.NO_CONTENT);
            return ResponseEntity.ok().body("The account associated with email address " + email + " was deleted.");
        }
    }
}





