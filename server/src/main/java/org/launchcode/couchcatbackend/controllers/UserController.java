package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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


    /**
     * REGISTRATION
     **/
     /* For registering a new user:
        checks if a user with that email already exists:
            if yes: a BAD REQUEST/400 HTTP response is returned w/ a custom body;
            otherwise: the user is created, the password is encoded, they are saved to the database,
                and a CREATED/201 HTTP response is returned w/ a custom body */

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody User user) {
        User isExist = (userRepository.findByEmail(user.getEmail()));
        if (isExist != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email " + user.getEmail() + " already exists. Either a new email to register.\n");
        }

        User newUser = new User();

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User was successfully registered.\n");
    }


    /**
     * LOGIN
     **/
    /*For logging a user in: looks for a user in the database with the email passed in from the login screen
    verifies the data received is not null, if it is, we return an HTTP 401 status with a custom message that the email does not exist
    otherwise, we encode the password that was passed in and compares it to the encoded password in the database for that user;
    if the passwords match, we return a 200 HTTP status and a custom message indicating the login was successful
    If they do not, we return a 401 HTTP status with a custom message indicating the email and password were note a match
     */

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> userLogin(@RequestBody User user) {
        User userLogin = (userRepository.findByEmail(user.getEmail()));

        if (userLogin != null) {
            String userLoginPassword = user.getPassword();
            String encodedPassword = userLogin.getPassword();
            boolean isPwdRight = passwordEncoder.matches(userLoginPassword, encodedPassword);
            if (isPwdRight) {
                User verifyUser = userRepository.findOneByEmailAndPassword(user.getEmail(), encodedPassword);
                    return ResponseEntity.status(HttpStatus.OK).body("Login successful\n");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: Email and password are not a match\n");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed: Email address does not exist\n");
        }
    }
}



    //TODO: This is part of Security Implementation I believe: Session handling methods that create the session ID and cookie which allows us to store and retrieve the login status of a user in a session / a logged-in user’s user ID will be stored in their session.
    //   We also need to receive the cookie from the front end as the user accesses restricted pages to validate the user against the information stored for the user's session to verify they are logged in/can access those pages.

    // for displaying user details
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
//    //  TODO: Add exception if id is not found



