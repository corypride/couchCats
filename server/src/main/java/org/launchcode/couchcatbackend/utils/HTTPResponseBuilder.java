package org.launchcode.couchcatbackend.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

public class HTTPResponseBuilder {
    /*overloaded ok method */
    public static ResponseEntity<String> ok(String body) {
        return ok(body, null);
    }

    public static ResponseEntity<String> ok(String body, HttpHeaders headers) {
        return headers != null
                ? ResponseEntity.ok().headers(headers).body(body)
                : ResponseEntity.ok().body(body);
    }

    /*overloaded created method that calls the original created method and passes null as the header value so this can
     be used even if you have a situation where you don't need to add headers, you can still use the HTTPResponseBuilder,
     and it will use this simplified version of the created method without providing the headers argument.*/
    public static ResponseEntity<String> created(String body) {
        return created(body, null);
    }

    public static ResponseEntity<String> created(String body, HttpHeaders headers) {
        return headers != null
                ? ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(body)
                : ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    public static ResponseEntity<String> unauthorized(String body) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
    }

    public static ResponseEntity<String> badRequest(String body) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    public static ResponseEntity<String> internalServerError(String body) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

    // Add more methods as needed for different HTTP status codes

}

