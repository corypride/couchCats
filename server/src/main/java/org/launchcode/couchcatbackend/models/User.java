package org.launchcode.couchcatbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class User {
    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private String username;
    //TO DO: Parameters for username

    //TO DO: ADD EMAIL

    @NotNull
    private String pwHash;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    //TO DO: CREATE RELATIONSHIP TO MOVIES TO ENABLE WATCHLIST
    @ManyToMany
    private final List<Movie> watchlist = new ArrayList<>();

    public User() {}

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

    public List<Movie> getWatchlist() {
        return watchlist;
    }

    public void addToWatchlist(Movie movie) {
        this.watchlist.add(movie);
    }

//    TODO: add functionality to delete from watchlist?

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (this == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
