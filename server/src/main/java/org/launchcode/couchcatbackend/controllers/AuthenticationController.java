package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable int id) {

        return userRepository.findById(id);
    }


    //For adding a user - simply testing receiving user data
    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public User register(@RequestBody User newUser) {
        return newUser; //not receiving the pw back from postman, need to figure that out

//        return (userService.saveUser(newUser)); //keeping as reference in case I end up using a Service class
    }


    // TO DO: PostMapping Method to Process Registration Form,
    // validate the entries and either send back error messages or create a new user and send back a success message


    // TO DO: PostMapping Method to Process Login Form,
    // validate the username and password are accurate/match what we have stored in the database for the user

    //TO DO: Session handling methods that create the session ID and cookie which allows us to store and retrieve the login status of a user in a session / a logged-in user’s user ID will be stored in their session.
    //   We also need to receive the cookie from the front end as the user accesses restricted pages to validate the user against the information stored for the user's session to verify they are logged in/can access those pages.


}
