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
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<UserMovieLog> getLog(@PathVariable int userId) {
        return userMovieLogRepository.findByIdUserId(userId);
    }

//    Log a movie at /log/save
    @PostMapping(path = "/save")
    @Transactional
    public void logMovie(@RequestBody MovieLogDTO movieLogDTO) {
        int userId = movieLogDTO.getUserId();
        Optional<User> result = userRepository.findById(userId);
        if (result.isEmpty()) {
    //        throw error
        }

        User user = result.get();

        Movie movie = movieLogDTO.getMovie();
    //    TODO: check if movie already exists?
        Movie savedMovie = movieRepository.save(movie);

//        create an ID for new UserMovieLog object
        UserMovieLog.UserMovieLogId userMovieId = new UserMovieLogId(user.getId(), savedMovie.getId());

//        before proceeding, check if user has already logged this movie
        Optional<UserMovieLog> userMovieLogResult = userMovieLogRepository.findById(userMovieId);
        if (userMovieLogResult.isPresent()) {
//            throw error/return HTTPStatus?
            return;
        }

//        create new UserMovieLog object using that ID
        int userRating = movieLogDTO.getUserRating();
        UserMovieLog userMovieLog = new UserMovieLog(userMovieId, userRating);
        userMovieLog.setMovie(savedMovie);
        userMovieLog.setUser(user);

        userMovieLogRepository.save(userMovieLog);
    }

//    TODO: code this
//    Change star rating for a logged movie
    @PostMapping
    public void changeRating(@RequestBody UserMovieLog entry) {
//      TODO: DTO that takes a UserMovie and an int newRating?
    }

//    Delete movie from log at /log
    @DeleteMapping
//    @Transactional
    public void deleteFromLog(@RequestBody UserMovieLogId id) {
        System.out.println("id: " + id);
        Optional result = userMovieLogRepository.findById(id);
        if (result.isPresent()) {
            UserMovieLog entry = (UserMovieLog) result.get();
            System.out.println("entry: " + entry);
            userMovieLogRepository.delete(entry);
        }
    }
}
