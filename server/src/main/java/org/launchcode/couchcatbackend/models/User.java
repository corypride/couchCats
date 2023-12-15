package org.launchcode.couchcatbackend.models;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.launchcode.couchcatbackend.data.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

    //TO DO: CREATE RELATIONSHIP TO MOVIES TO ENABLE WATCHLIST
    @ManyToMany(cascade = CascadeType.ALL)
    private final List<Movie> movies = new ArrayList<>();

//    @Autowired
//    private MovieRepository movieRepository;

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

    //    public boolean isMatchingPassword(String password) {
//        return encoder.matches(password, pwHash);
//    }

    public List<Movie> getWatchlist() {
        return movies;
    }

//    @Transactional
    public void addToWatchlist(Movie movie) {
//        System.out.println("watchlist: " + getWatchlist());
//        System.out.println("users: " + movie.getUsers());
        System.out.println("user.addToWatchlist runs");
//        movies.add(movie);

        if (!movies.contains(movie)) {
            movies.add(movie);
            movie.addToUsers(this);
        }
//        System.out.println("watchlist.add runs");
//        System.out.println("watchlist: " + getWatchlist());
//        System.out.println("users: " + movie.getUsers());
//        System.out.println("movie.addToUsers is called");
//        movie.addToUsers(this);
//        System.out.println("users: " + movie.getUsers());
//        System.out.println("watchlist: " + getWatchlist());
    }

//    public void addToWatchlistById(int id) {
//        Optional<Movie> result = movieRepository.findById(id);
//        Movie movie = result.get();
//        this.watchlist.add(movie);
//    }

    public void removeFromWatchlist(Movie movie) {
        this.movies.remove(movie);
    }

    public void removeFromWatchlistById(int id) {
        List<Movie> moviesToRemove = new ArrayList<>();
        for (Movie movie : movies) {
            if (movie.getId() == id) {
                moviesToRemove.add(movie);
                break;
            }
        }

        movies.removeAll(moviesToRemove);
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
                ", movies=" + movies +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
