package org.launchcode.couchcatbackend.controllers;

import jakarta.transaction.Transactional;
import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.data.UserMovieLogRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.UserMovieLog;
import org.launchcode.couchcatbackend.models.UserMovieLog.UserMovieLogId;
import org.launchcode.couchcatbackend.models.dto.MovieLogDTO;
import org.launchcode.couchcatbackend.models.dto.RatingChangeDTO;
import org.launchcode.couchcatbackend.utils.HTTPResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/log")
public class LogController {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMovieLogRepository userMovieLogRepository;

//    Return all of a user's logged movies at /log/{userId}
    @GetMapping(value = "/{userId}")
    public ResponseEntity<Object> getLog(@PathVariable int userId) {
        List<UserMovieLog> result = userMovieLogRepository.findByIdUserId(userId);
        if (result.isEmpty()) {
//            TODO: for front end: is it better to just return an empty list if user hasn't logged any movies?
            return new ResponseEntity<>("You have not logged any movies", HttpStatus.NO_CONTENT);
        } else {
            return ResponseEntity.ok().body(result);
        }
    }

//    Log a movie at /log/save
    @PostMapping(value = "/save")
    @Transactional
    public ResponseEntity<String> logMovie(@RequestBody MovieLogDTO movieLogDTO) {
        int userId = movieLogDTO.getUserId();
        Optional<User> result = userRepository.findById(userId);
        if (result.isEmpty()) {
            return HTTPResponseBuilder.badRequest("Could not access user data");
        }

        User user = result.get();
        Movie movie = movieLogDTO.getMovie();
        Movie savedMovie = movieRepository.save(movie);

//        create an ID for new UserMovieLog object
        UserMovieLog.UserMovieLogId userMovieId = new UserMovieLogId(user.getId(), savedMovie.getId());

//        before proceeding, check if user has already logged this movie
//        TODO: some better way to handle this? let users log movies multiple times for multiple watches? give option to update log with new rating?
        Optional<UserMovieLog> userMovieLogResult = userMovieLogRepository.findById(userMovieId);
        if (userMovieLogResult.isPresent()) {
            return HTTPResponseBuilder.badRequest("You have already logged this movie");
        }

//        create new UserMovieLog object using that ID
        int userRating = movieLogDTO.getUserRating();
        UserMovieLog userMovieLog = new UserMovieLog(userMovieId, userRating);
        userMovieLog.setMovie(savedMovie);
        userMovieLog.setUser(user);

        userMovieLogRepository.save(userMovieLog);
        return ResponseEntity.ok().body("You logged " + movie.getTitle() + " with a rating of " + userMovieLog.getUserRating() + " stars");
    }

//    Change star rating for a logged movie at /log/rate
    @PostMapping(value = "/rate")
    public ResponseEntity<String> changeRating(@RequestBody RatingChangeDTO ratingChangeDTO) {
        UserMovieLogId id = ratingChangeDTO.getUserMovieLogId();
        int newRating = ratingChangeDTO.getNewRating();
        Optional result = userMovieLogRepository.findById(id);
        if (result.isPresent()) {
            UserMovieLog entry = (UserMovieLog) result.get();
            entry.setUserRating(newRating);
            userMovieLogRepository.save(entry);
            return ResponseEntity.ok().body("You gave " + entry.getMovie().getTitle() + " a rating of " + newRating + " stars");
        } else {
            return HTTPResponseBuilder.badRequest("Movie log data not found");
        }
    }

//    Delete movie from log at /log
    @DeleteMapping
//    @Transactional
    public ResponseEntity<String> deleteFromLog(@RequestBody UserMovieLogId id) {
        Optional result = userMovieLogRepository.findById(id);
        if (result.isPresent()) {
            UserMovieLog entry = (UserMovieLog) result.get();
            userMovieLogRepository.delete(entry);
            return ResponseEntity.ok().body("Log entry deleted");
        } else {
            return HTTPResponseBuilder.badRequest("Log entry not found");
        }
    }
}
