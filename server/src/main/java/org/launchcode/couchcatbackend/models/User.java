package org.launchcode.couchcatbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;
import org.launchcode.couchcatbackend.data.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

//    @Autowired
//    private MovieRepository movieRepository;

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

//    public void addToWatchlistById(int id) {
//        Optional<Movie> result = movieRepository.findById(id);
//        Movie movie = result.get();
//        this.watchlist.add(movie);
//    }

    public void removeFromWatchlist(Movie movie) {
        this.watchlist.remove(movie);
    }

//    public void removeFromWatchlistById(int id) {
//        Optional<Movie> result = movieRepository.findById(id);
//        Movie movie = result.get();
//        this.watchlist.remove(movie);
//    }

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
