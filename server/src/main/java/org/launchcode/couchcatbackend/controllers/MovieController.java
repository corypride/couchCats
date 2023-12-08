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

//    TODO: test if this works
//    Return all movies on a user's watchlist
    @GetMapping(value = "/{userid}/watchlist")
    public List<Movie> getWatchlist(@PathVariable int userid) {
        Optional<User> result = userRepository.findById(userid);
        User user = result.get();
        return user.getWatchlist();
    }


//    TODO: test if this works
//    Add movie to database
    @PostMapping
    public void saveMovie(@RequestBody Movie movie) {
        movieRepository.save(movie);
    }

//    TODO: check if this works
    @PostMapping
    public void saveMovieToWatchlist(@RequestBody UserMovieDTO userMovieDTO) {
        Movie movie = userMovieDTO.getMovie();
        User user = userMovieDTO.getUser();
        user.addToWatchlist(movie);
//        TODO: check if this movie ID already exists in the database
        movieRepository.save(movie);
    }

//    Delete one movie from database
//    TODO: test if this works (I'm not sure how)
//    TODO: do I need to check if a movie with that ID exists first?
    @DeleteMapping(value = "/{id}")
    public void deleteMovie(@PathVariable int id) {
        movieRepository.deleteById(id);
    }
}
