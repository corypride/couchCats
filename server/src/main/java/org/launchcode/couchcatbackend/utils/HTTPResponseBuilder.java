package org.launchcode.couchcatbackend.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

public class HTTPResponseBuilder {
    public static ResponseEntity<String> ok(String body, HttpHeaders headers) {
        return ResponseEntity.ok().headers(headers).body(body);
    }
    public static ResponseEntity<String> created(String body, HttpHeaders headers) {
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    public static ResponseEntity<String> unauthorized(String body) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
    }

    // Add more methods as needed for different HTTP status codes

}

