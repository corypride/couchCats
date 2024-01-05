package org.launchcode.couchcatbackend.controllers;

import jakarta.transaction.Transactional;
import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.dto.UserMovieDTO;
import org.launchcode.couchcatbackend.utils.HTTPResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/watchlist")
public class WatchlistController {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

//    Return all movies on a user's watchlist at /watchlist/{userId}
    @GetMapping(value = "/{userId}")
    public ResponseEntity<List<Movie>> getWatchlist(@PathVariable int userId) {
        Optional<User> result = userRepository.findById(userId);
        if (result.isPresent()) {
            User user = result.get();
            return ResponseEntity.ok().body(user.getWatchlist());
        }
        return ResponseEntity.notFound().build();
    }

//    Save movie to watchlist at /watchlist/save
    @PostMapping(path = "/save")
    @Transactional
    public ResponseEntity<String> saveMovieToWatchlist(@RequestBody UserMovieDTO userMovieDTO) {
        int userId = userMovieDTO.getUserId();
        Optional<User> result = userRepository.findById(userId);
        if (result.isEmpty()) {
            return HTTPResponseBuilder.badRequest("Could not access user data");
        }

        User user = result.get();
        Movie movie = userMovieDTO.getMovie();

        user.addToWatchlist(movie);
        userRepository.save(user);
        return ResponseEntity.ok().body(movie.getTitle() + " was saved to your watchlist");
    }

//    Delete movie from watchlist at /watchlist
    @DeleteMapping
    @Transactional
    public ResponseEntity<String> deleteFromWatchlist(@RequestBody Map<String, Integer> requestBody) {
        int userId = requestBody.get("userId");
        int movieId = requestBody.get("movieId");

        Optional<User> userResult = userRepository.findById(userId);
        Optional<Movie> movieResult = movieRepository.findById(movieId);

        if (userResult.isPresent() && movieResult.isPresent()) {
            User user = userResult.get();
            Movie movie = movieResult.get();
            user.removeFromWatchlistById(movieId);
            return ResponseEntity.ok().body(movie.getTitle() + " was removed from your watchlist");
        } else {
            return HTTPResponseBuilder.badRequest("Invalid user or movie data");
        }
    }
}
