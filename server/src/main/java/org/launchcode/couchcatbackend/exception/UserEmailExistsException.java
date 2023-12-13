package org.launchcode.couchcatbackend.exception;

public class UserEmailExistsException extends Exception {
    public UserEmailExistsException(String message) {
        super(message);
    }
}
