package org.launchcode.couchcatbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.launchcode.couchcatbackend.data.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;

    @NotNull
    @NotEmpty
    private String firstName;

    @NotNull
    @NotEmpty
    private String lastName;
    
    @NotNull
    @NotEmpty
    private String email;

    @NotNull
    @NotEmpty
    private String password;

    private String sessionId;


    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private final List<Movie> watchlist = new ArrayList<>();

    public User() {}

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public List<Movie> getWatchlist() {
        return watchlist;
    }

    public void addToWatchlist(Movie movie) {
        System.out.println("addToWatchlist called");
        if (!watchlist.contains(movie)) {
            watchlist.add(movie);
//            movie.addToUsers(this);
            System.out.println("if statement in addToWatchlist runs");
        }
    }

//    TODO: fix or remove this (by adding to Service class?) - can't access movieRepository here
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
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", watchlist=" + watchlist +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
