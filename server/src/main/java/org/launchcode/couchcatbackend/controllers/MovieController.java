package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.dto.UserMovieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

//    Return all movies at /movies
    @GetMapping
    public List<Movie> getMovies() {
        List<Movie> allMovies;
        allMovies = (List<Movie>) movieRepository.findAll();
        return allMovies;
    }

//    Return one movie by ID at /movies/{id}
    @GetMapping(value = "/{id}")
    public Movie getMovie(@PathVariable int id) {
        return movieRepository.findById(id).orElseThrow(RuntimeException::new);
    }

//    Return all movies on a user's watchlist at /movies/watchlist/{userId}
    @GetMapping(value = "/watchlist/{userid}")
    public List<Movie> getWatchlist(@PathVariable int userId) {
        Optional<User> result = userRepository.findById(userId);
        User user = result.get();
        return user.getWatchlist();
    }

//    Add movie to database at /movies
    @PostMapping
    public void saveMovie(@RequestBody Movie movie) {
        movieRepository.save(movie);
    }

//    TODO: check if this works (I'm not sure how)
//    Save movie to watchlist at /movies/save
    @PostMapping(path = "save")
    public void saveMovieToWatchlist(@RequestBody Movie movie, @RequestBody User user) {
        user.addToWatchlist(movie);
//        TODO: check if this movie ID already exists in the database
        movieRepository.save(movie);
    }

//    Delete one movie from database at /movies/delete/{id}
//    TODO: this isn't working. permissions/authorization issue? try in postman
//    TODO: do I need to check if a movie with that ID exists first?
    @DeleteMapping(value = "/delete/{id}")
    public void deleteMovie(@PathVariable("id") int id) {
        movieRepository.deleteById(id);
    }

//    TODO: check if this works
//    Delete movie from watchlist
    @PostMapping(path = "/watchlist/{userId}/delete/{movieId}")
    public void deleteFromWatchlist(@PathVariable int userId, @PathVariable int movieId) {
        Optional<User> result = userRepository.findById(userId);
        User user = result.get();
        user.removeFromWatchlistById(movieId);
    }
}
