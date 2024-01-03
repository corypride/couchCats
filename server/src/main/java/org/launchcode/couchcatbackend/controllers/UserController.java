package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.dto.UserDetailsDTO;
import org.launchcode.couchcatbackend.services.UserService;
import org.launchcode.couchcatbackend.utils.HTTPResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> userLogin(@RequestBody User user) {
        return userService.authenticateUser(user);
    }


    //TODO: Implement features such as session expiration, secure storage of session IDs, and mechanisms for session revocation.
    @PostMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> logoutUser(@CookieValue(name = "sessionId", required = false) String sessionId) {
       if (sessionId != null && !sessionId.isEmpty()) {
           return userService.logoutUser(sessionId);
       } else {
           return HTTPResponseBuilder.badRequest("Invalid session ID");
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
//    //  TODO: YUMI - review the below suggested approach to the user details method to replace the one above
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
}





