package org.launchcode.couchcatbackend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
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
    @Email
    private String email;

    @NotNull
    private String password; //commented out pwHash and using simple String for now for testing API

//    @NotNull
//    private String pwHash;

//    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    //TO DO: CREATE RELATIONSHIP TO MOVIES TO ENABLE WATCHLIST
    @ManyToMany(cascade = CascadeType.ALL)
    private final List<Movie> watchlist = new ArrayList<>();

//    @Autowired
//    private MovieRepository movieRepository;

    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
//        this.pwHash = encoder.encode(password);
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    //    public boolean isMatchingPassword(String password) {
//        return encoder.matches(password, pwHash);
//    }

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

    public void removeFromWatchlistById(int id) {
        List<Movie> moviesToRemove = new ArrayList<>();
        for (Movie movie : watchlist) {
            if (movie.getId() == id) {
                moviesToRemove.add(movie);
                break;
            }
        }

        watchlist.removeAll(moviesToRemove);
    }

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
