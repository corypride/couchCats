package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.exception.UsernameExistsException;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/details/{id}")
    public Optional<User> getUserDetailsById(@PathVariable int id) {
        //  TODO: Update so we are only returning the username, email and not the password to display on the profile page
        //  TODO: Add exception if id is not found
        return userRepository.findById(id);
    }


    //For adding a user - simply testing receiving user data

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public User register(@RequestBody User user) throws UsernameExistsException {
        //    TODO: check if username already exists in database, and throw exception; I don't think this is quite the right way to implement this
        User isExistUsername = userRepository.findByUsername(user.getUsername()); //TODO: figure out how to implement error handling and exceptions
        // Notes: I ran with the if statement commented out and found that this alone will add a second user to the
        // database, but then this automatically returns a 500 status code, with the message:
        // "Query did not return a unique result: 2 results were returned"

//        if(isExistUsername != null){
//            try {
//                throw new UsernameExistsException("An account with the username: " + user.getUsername() +" already exists. Please register with a new username.");
//            } catch (UsernameExistsException e) {
//                e.printStackTrace();
//            }

//        }

        //    TODO: check if email already exists in database and throw exception
//        User isExistEmail = userRepository.findByEmail(user.getEmail());
//        if(isExistEmail != null){
//            throw new Exception("An account associated with the email address: " + user.getEmail() +" already exists. Please either login or create an account using a different email.");
//        }

        User newUser = new User();

         newUser.setUsername(user.getUsername());
         newUser.setEmail(user.getEmail());
         newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);
        return newUser;
    }

    // TODO: PostMapping Method to Receive Login Form Data (username, password)
    //  check for username in database, throw exception if username is not found
    //  also need to validate the username and password match what we have stored in the database for the user


    // TODO: PostMapping Method to Process Login Form,
    //  validate the username and password are accurate/match what we have stored in the database for the user


    //TODO: This is part of Security Implementation I believe: Session handling methods that create the session ID and cookie which allows us to store and retrieve the login status of a user in a session / a logged-in user’s user ID will be stored in their session.
    //   We also need to receive the cookie from the front end as the user accesses restricted pages to validate the user against the information stored for the user's session to verify they are logged in/can access those pages.


}
