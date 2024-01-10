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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
            return HTTPResponseBuilder.badRequest("User with email " + user.getEmail() + " already exists. Enter a new email to register.\n");
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
        //takes in the password passed with the user details from the front end, and the stored password
        // for that same user in the database, compares the encoded versions,
        // returns a boolean value of true when they match, false when they do not
        String providedPassword = providedUser.getPassword();
        String storedPassword = storedUser.getPassword();
        return passwordEncoder.matches(providedPassword, storedPassword);
    }

    public ResponseEntity<Object> authenticateUser(User user) {
        User userLogin = (userRepository.findByEmail(user.getEmail()));

        if (userLogin != null) {
            //next call isPasswordCorrect to check if the password is valid
            if (isPasswordCorrect(user, userLogin)) {
                //if passwords match, the login credentials are valid so we can generate a sessionId
                String sessionId = authenticationConfig.createSession(user.getEmail());
                HttpHeaders headers = new HttpHeaders();
                //Set-Cookie with the sessionId; use HttpOnly attribute which prevents them from being accessed via JavaScript.
                // They are mainly used for security to mitigate the risk of cross-site scripting (XSS) attacks.
                //And Cookies must be secure for Cross Site (we have two diff ports)
                headers.add(HttpHeaders.SET_COOKIE, "sessionId=" + userLogin.getSessionId() + "; Path=/; Max-Age=3600; HttpOnly; SameSite=None; Secure" );
                System.out.println(headers);
                return ResponseEntity.ok().headers(headers).body(userLogin);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: Invalid Credentials.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed: Email address does not exist\n");
        }
    }

    /**
     * LOGOUT
     **/
    /* For logging a user out: receives sessionId, calls sessionInvalidated in Authentication Config which sets the
    sessionId to null; resets the cookie and returns logout successful;
     */
    //TODO: For this method to fully work to clear the cookie, we have to be running localhost on https, need to put cert in place
    //TODO:Once we have the front end call to /secure working, refactor to also take in userId in addition to sessionId,
    // update isValidSession to use same validation methods so we can use that in the /secure as well,
    // and then proceed with  executing the logic to expire the cookie as it exists
    public ResponseEntity<String> logoutUser(String sessionId) {
        boolean sessionValidated = authenticationConfig.isValidSession(sessionId);
        if (sessionValidated) {
            //if the sessionId is a valid session we will then call the invalidate session method,
            // which changes the sessionId to null; and the cookie is reset and the message logout successful is returned
            authenticationConfig.invalidateSession(sessionId);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, "sessionId=; Max-Age=0; HttpOnly; SameSite=None; Secure");
            return HTTPResponseBuilder.ok("Logout successful", headers);
    } else {
            // if the sessionID is not invalidated (it was already null or empty) then the logout fails
            return HTTPResponseBuilder.internalServerError("Logout failed");
    }
}

}
