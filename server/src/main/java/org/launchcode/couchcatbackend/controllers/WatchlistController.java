package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        User user = result.get();
        return user.getWatchlist();
    }

//    TODO: check if this works (I'm not sure how)
//    Save movie to watchlist at /watchlist/save
    @PostMapping(path = "/save")
    public void saveMovieToWatchlist(@RequestBody Movie movie, @RequestBody User user) {
        user.addToWatchlist(movie);
//        TODO: check if this movie ID already exists in the database
        movieRepository.save(movie);
    }

//    TODO: check if this works
//    Delete movie from watchlist
//    @DeleteMapping(path = "/{userId}/delete/{movieId}")
//    public void deleteFromWatchlist(@PathVariable int userId, @PathVariable int movieId) {
//        Optional<User> result = userRepository.findById(userId);
//        User user = result.get();
//        user.removeFromWatchlistById(movieId);
//    }
}
