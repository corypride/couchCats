package org.launchcode.couchcatbackend.models.dto;

import jakarta.validation.constraints.Email;

public class RegisterFormDTO extends org.launchcode.couchcatbackend.models.dto.LoginFormDTO {
//The Registration form extends the login form because it shares two of the same fields: username and password.
// We then require the user to fill in two additional fields here, an email and a second verify password field.
    @Email
    private String email;
    private String verifyPassword;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
