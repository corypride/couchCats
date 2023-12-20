package org.launchcode.couchcatbackend.controllers;

import jakarta.transaction.Transactional;
import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.data.UserMovieLogRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.UserMovieLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/log")
public class UserMovieLogController {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMovieLogRepository userMovieLogRepository;

//    Return all of a user's logged movies at /log/{userId}
    @GetMapping(value = "/{userId}")
    public List<UserMovieLog> getLog(@PathVariable int userId) {
        return userMovieLogRepository.findByIdUserId(userId);
    }

//    TODO: keep either this or the one above
//    Return all of a user's logged movies at /log/test/{userId}
    @GetMapping(value = "/test/{userId}")
    public List<UserMovieLog> getLogTest(@PathVariable int userId) {
        Optional<User> result = userRepository.findById(userId);
//      TODO: optional check
        User user = result.get();
        return user.getMovieLog();
    }

//    Log a movie at /log/save

//    Change star rating for a logged movie
//    create a DTO that takes a UserMovie and an int newRating?

//    Delete movie from log at /log
    @DeleteMapping
    @Transactional
    public void deleteFromLog(@RequestBody UserMovieLog entry) {
        userMovieLogRepository.delete(entry);
    }
}
