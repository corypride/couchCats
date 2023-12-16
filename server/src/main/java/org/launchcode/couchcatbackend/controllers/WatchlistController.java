package org.launchcode.couchcatbackend.controllers;

import jakarta.transaction.Transactional;
import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.dto.UserMovieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/watchlist")
public class WatchlistController {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

//    Return all movies on a user's watchlist at /watchlist/{userId}
    @GetMapping(value = "/{userId}")
    public List<Movie> getWatchlist(@PathVariable int userId) {
        Optional<User> result = userRepository.findById(userId);
//      TODO: optional check
        User user = result.get();
        return user.getWatchlist();
    }

//    Save movie to watchlist at /watchlist/save
    @PostMapping(path = "/save")
    @Transactional
    public void saveMovieToWatchlist(@RequestBody UserMovieDTO userMovieDTO) {
        User user = userMovieDTO.getUser();
        Movie movie = userMovieDTO.getMovie();

//      NOTE: saving the movie to a uesr's watchlist seems to add it to the DB automatically, but leaving this here just in case

//      if movie is not already in database, add it
//        int movieId = movie.getId();
//        Optional<Movie> result = movieRepository.findById(movieId);
//        if (result.isEmpty()) {
//            movieRepository.save(movie);
//        }

//      add movie to user watchlist
        user.addToWatchlist(movie);

//      save changes to user
        userRepository.save(user);
    }

//    Delete movie from watchlist at /watchlist
    @DeleteMapping
    @Transactional
    public void deleteFromWatchlist(@RequestBody Map<String, Integer> requestBody) {
//        TODO: is it easier for front end if this takes a User object and a Movie object instead of IDs?
        int userId = requestBody.get("userId");
        int movieId = requestBody.get("movieId");

        Optional<User> result = userRepository.findById(userId);

        if (result.isPresent()) {
            User user = result.get();
            user.removeFromWatchlistById(movieId);
        } else {
            // return new ResponseEntity?
        }
    }
}
