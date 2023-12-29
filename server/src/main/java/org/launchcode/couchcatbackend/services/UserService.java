package org.launchcode.couchcatbackend.services;

import org.launchcode.couchcatbackend.configuration.AuthenticationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private AuthenticationConfig authenticationConfig;

    //TODO: Move Register business logic here from User Controller

    //TODO: Move Login business logic here from User Controller

    /**
     * LOGOUT
     **/
    /*For logging a user out: receives sessionId, calls sessionInvalidated in Authentication Config which sets the
    sessionId to null; resets the cookie and returns logout successful;
     */
    public ResponseEntity<String> logoutUser(String sessionId) {
        boolean sessionInvalidated = authenticationConfig.invalidateSession(sessionId); // method changes a valid sessionId passed at logout to null

        if (sessionInvalidated) { //if the sessionId is invalidated -- changed to null; this code executes, and the cookie is reset and the message logout successful is returned
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, "sessionId=; Path=/; Max-Age=0; Secure; HttpOnly");
        return ResponseEntity.ok().headers(headers).body("Logout successful");
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed"); // if the sessionID is not invalidated (it was already null or empty) then the logout fails
    }
}
}
