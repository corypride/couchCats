package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("hello")
    @ResponseBody
    public String hello() {
        return "Hello, Spring!";
    }

    //TO DO: Session handling methods that create the session ID and cookie which allows us to store and retrieve the login status of a user in a session / a logged-in user’s user ID will be stored in their session.
    //   We also need to receive the cookie from the front end as the user accesses restricted pages to validate the user against the information stored for the user's session to verify they are logged in/can access those pages.

    // TO DO: PostMapping Method to Process Registration Form,
    // validate the entries and either send back error messages or create a new user and send back a success message


    // TO DO: PostMapping Method to Process Login Form,
    // validate the username and password are accurate/match what we have stored in the database for the user


}
