package org.launchcode.couchcatbackend.services;

import org.launchcode.couchcatbackend.configuration.AuthenticationConfig;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.utils.HTTPResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
        System.out.println("User being passed in: " + user);
        User isExist = (userRepository.findByEmail(user.getEmail()));
        System.out.println("isExist value: " + user);
        if (isExist != null) {
            return HTTPResponseBuilder.badRequest("User with email " + user.getEmail() + " already exists. Enter a new email to register.\n");
        }

        User newUser = new User();

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);
        String uri = ServletUriComponentsBuilder
                .fromCurrentContextPath() //excludes "/register" from URI
                .path("/user/{id}")
                .buildAndExpand(newUser.getId())
                .toUriString();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.LOCATION, uri);
        return HTTPResponseBuilder.created("User was successfully registered.", headers);
    }

    /**
     * Authenticate User - Login
     **/
    /*For logging a user in: First method compares the provided user and stored user passwords to validate if they match;
    Second method looks for a user in the database with the email passed in from the login screen, verifies the data
    received has a match/is not null; if does not have a match/is null, we return an HTTP 401 status with a custom
    message that the email does not exist; otherwise, we call the first method to check if the passwords match,
    and we return a 200 HTTP status and a custom message indicating the login was successful;
    If they do not, we return a 401 HTTP status with a custom message that email and password were not a match;
     */
    private boolean isPasswordCorrect(User providedUser, User storedUser) {
        String providedPassword = providedUser.getPassword();
        String storedPassword = storedUser.getPassword();
        return passwordEncoder.matches(providedPassword, storedPassword);
    }

    public ResponseEntity<String> authenticateUser(User user) {
        User userLogin = (userRepository.findByEmail(user.getEmail()));

        if (userLogin != null) {
            if (isPasswordCorrect(user, userLogin)) {
                String sessionId = authenticationConfig.createSession(user.getEmail());
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.SET_COOKIE, "sessionId=" + userLogin.getSessionId() + "; Path=/; Secure; HttpOnly"); // Sets the Secure and HttpOnly attributes for the cookie
                return HTTPResponseBuilder.ok("Login successful\n", headers);
            } else {
                return HTTPResponseBuilder.unauthorized("Login failed: Email and password are not a match\n");
            }
        } else {
            return HTTPResponseBuilder.unauthorized("Login Failed: Email address does not exist\n");
        }
    }

    public ResponseEntity<String> authenticateSecureEndpoint(String sessionId) {
        if (authenticationConfig.isValidSession(sessionId)) {
            //update last activity
            AuthenticationConfig.updateLastActivityTime(sessionId);
            // Process the request for the authenticated user
            return HTTPResponseBuilder.ok("Authorized access");
        } else {
            return HTTPResponseBuilder.unauthorized("Session expired or invalid");
        }
    }


    /**
     * LOGOUT
     **/
    /* For logging a user out: receives sessionId, calls sessionInvalidated in Authentication Config which sets the
    sessionId to null; resets the cookie and returns logout successful;
     */
    public ResponseEntity<String> logoutUser(String sessionId) {
        boolean sessionInvalidated = authenticationConfig.invalidateSession(sessionId); // method changes a valid sessionId passed at logout to null

        if (sessionInvalidated) { //if the sessionId is invalidated -- changed to null; this code executes, and the cookie is reset and the message logout successful is returned
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, "sessionId=; Path=/; Max-Age=0; Secure; HttpOnly");
        return HTTPResponseBuilder.ok("Logout successful", headers);
    } else {
        return HTTPResponseBuilder.internalServerError("Logout failed"); // if the sessionID is not invalidated (it was already null or empty) then the logout fails
    }
}

}
