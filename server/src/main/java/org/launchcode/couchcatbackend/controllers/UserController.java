package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.HttpClientErrorException;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //For adding a user: checks if a user with that email already exists and returns BAD REQUEST/400 error w/ custom body if so,
    // otherwise, the user is created, the password is encoded and a CREATED/201 HTTP response is returned

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody User user) {
        User isExist = (userRepository.findByEmail(user.getEmail()));
        if (isExist != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email " + user.getEmail() + " already exists. Either a new email to register.");
        }
        User newUser = new User();

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("HTTP Status will be CREATED (CODE 201)\n");

    }
}


    // TODO: PostMapping Method to Receive Login Form Data (username, password)
    //  check for username in database, throw exception if username is not found
    //  also need to validate the username and password match what we have stored in the database for the user



    //TODO: This is part of Security Implementation I believe: Session handling methods that create the session ID and cookie which allows us to store and retrieve the login status of a user in a session / a logged-in user’s user ID will be stored in their session.
    //   We also need to receive the cookie from the front end as the user accesses restricted pages to validate the user against the information stored for the user's session to verify they are logged in/can access those pages.

    // for displaying user details
//    @GetMapping("/details/{id}")
//    public User getUserDetailsById(@PathVariable int id) {
//        //  TODO: Update so we are only returning the first name, last name, email and watchlist and not the password to display on the profile page
//        Optional<User> result = userRepository.findById(id);
//        if (result.isPresent()) {
//            User user = result.get();
//            return user;
//        }
//
//        return null;
//    }
//    //  TODO: Add exception if id is not found


