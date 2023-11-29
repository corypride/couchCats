package org.launchcode.couchcatbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User {
    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    public User(String username, String password) {
        this.username = username;
        this.pwHash = encoder.encode(password);
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }
    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }

}
