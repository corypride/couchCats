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

