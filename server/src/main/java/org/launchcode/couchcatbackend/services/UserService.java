package org.launchcode.couchcatbackend.services;

import org.launchcode.couchcatbackend.configuration.AuthenticationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

public class UserService {

    @Autowired
    private AuthenticationConfig authenticationConfig;

    //TODO: Move Register business logic here from User Controller

    //TODO: Move Login business logic here from User Controller


    public ResponseEntity<String> logoutUser(String email) {
        boolean sessionInvalidated = authenticationConfig.invalidateSession(email);

    if (sessionInvalidated) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, "sessionId=; Path=/; Max-Age=0; Secure; HttpOnly");
        return ResponseEntity.ok().headers(headers).body("Logout successful");
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed");
    }
}
}
