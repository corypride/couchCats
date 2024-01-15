package org.launchcode.couchcatbackend.services;

import org.launchcode.couchcatbackend.configuration.AuthenticationConfig;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.utils.HTTPResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationConfig authenticationConfig;

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
    public ResponseEntity<String> registerUser(User user) {
        // If a User with the email passed does not exist in the database, null is assigned as the value of isExist,
        //otherwise, the user details are assigned to isExist, so it bypasses the if statement
        User isExist = (userRepository.findByEmail(user.getEmail()));
        if (isExist != null) {
            return HTTPResponseBuilder.badRequest("User with email " + user.getEmail() + " already exists. Check for errors, enter a new email to register, or if you already have an account, go to login.");
        }

        User newUser = new User();

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);
        return HTTPResponseBuilder.created("User was successfully registered.");
    }

    /**
     * LOGIN - AUTHENTICATE USER
     **/
    //takes in the password from the form fill and the stored password of the same user who was found by email
    private boolean isPasswordCorrect(User providedUser, User storedUser) {
        String providedPassword = providedUser.getPassword();
        String storedPassword = storedUser.getPassword();
        //encodes the password from the form fill, compares to see if they match, returns true if yes, false if not
        return passwordEncoder.matches(providedPassword, storedPassword);
    }

    public ResponseEntity<Object> authenticateUser(User user) {
//        finds user by email from form fill to verify they are registered user,
//        if no match, userLogin is assigned the value of null,
//        otherwise, userLogin is assigned the values of that User,
        User userLogin = (userRepository.findByEmail(user.getEmail()));

        if (userLogin != null) {
            //next call isPasswordCorrect to check if the password is valid
            if (isPasswordCorrect(user, userLogin)) {
                //if passwords match, the login credentials are valid, a sessionId is generated,
                // which is used to authenticate the user's login status as they navigate the application and grant them access to secure pages, display appropriate states
                String sessionId = authenticationConfig.createSession(user.getEmail());
                HttpHeaders headers = new HttpHeaders();
                //Set-Cookie with the sessionId; HttpOnly prevents value from being accessed via JavaScript to
                // mitigate the risk of cross-site scripting (XSS) attacks,
                // and Secure which is required for Cross Origin requests
                headers.add(HttpHeaders.SET_COOKIE, "sessionId=" + userLogin.getSessionId() + "; Path=/; Max-Age=3600; HttpOnly; SameSite=None; Secure");
                return ResponseEntity.ok().headers(headers).body(userLogin);
            } else {
                //returned when the password entered does not match the stored password
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: Invalid Credentials");
            }
        } else {
            //returned when a user with the email entered does not exist
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: Invalid Credentials"); //this is if their email doesn't exist in the database at all
        }
    }

    /**
     * AUTHENTICATE SESSION
     **/
    public ResponseEntity<String> autheticateSession(Integer id, String sessionId) {
        User retrievedUser = userRepository.findBySessionId(sessionId);
        if (retrievedUser != null && id != null) {
            Optional<User> providedUser = userRepository.findById(id);
            if (providedUser.isPresent() && retrievedUser.equals(providedUser.get())) {
                return HTTPResponseBuilder.ok("Session is valid.");
            } else {
                return HTTPResponseBuilder.badRequest("Invalid credentials.");
            }
        }
        return HTTPResponseBuilder.badRequest("Credentials not found.");

    }

    /**
     * LOGOUT
     **/
    /*NOTE: For MVP, this is a known issue: to expire and truly clear the cookie from the browser, we have to be running
    the application on https:// not http://, which requires an SSL certificate.
    Prior to pushing to a production environment, for this security method to fully work, we would run on https,
    retest to validate, and run the future dev, staging and production environments on https */
    public ResponseEntity<String> logoutUser(String sessionId) {
        if (sessionId != null) {
            boolean sessionValidated = authenticationConfig.isValidSession(sessionId);
            System.out.println(sessionValidated);
            if (sessionValidated) {
                //if sessionId is valid, calls this method, which changes the sessionId to null in the database,
                // which is important for our isAuthenticated method in the front end, which checks if a user is logged in and grants or restricts access to secure pages accordingly;
                authenticationConfig.invalidateSession(sessionId);
                HttpHeaders headers = new HttpHeaders();
                //            sets the cookie in the browser to an empty value, expires it using max-age=0 and returns logout successful;
                headers.add(HttpHeaders.SET_COOKIE, "sessionId=; Max-Age=0; HttpOnly; SameSite=None; Secure");
                return HTTPResponseBuilder.ok("Logout successful", headers);
            }
        }
        //occurs if sessionId was null or if sessionId was empty/had a value that didn't match a user in the database;
        return HTTPResponseBuilder.badRequest("Unable to authenticate session.");
    }
}
