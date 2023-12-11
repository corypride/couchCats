package org.launchcode.couchcatbackend.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class RegistrationDTO {

    @NotNull
    @NotEmpty
    private static String username;

    @NotNull
    @NotEmpty
    private static String email;

    @NotNull
    @NotEmpty
    private static String password;

    public static String getUsername() {
        return username;
    }

    public static void setUsername(String username) {
        RegistrationDTO.username = username;
    }

    public static String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        RegistrationDTO.email = email;
    }

    public static String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        RegistrationDTO.password = password;
    }
}

