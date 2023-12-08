package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
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
    public Optional<Movie> getMovie(@PathVariable int id) {
        return movieRepository.findById(id);
    }

//    TODO: return all movies on a user's watchlist


//    TODO: finish method. do you use a DTO for this?
//    Add movie to database
//    @PostMapping
//    public Movie postMovie(@RequestBody MovieDTO movieDTO) {
//        return movieRepository.save(movieDTO.getName(), movieDTO.getId());
//    }

//    TODO: method that adds movie to user watchlist (and checks if that movie is already stored in the database and stores it if not)

//    Delete one movie from database
//    TODO: test if this works (I'm not sure how)
//    TODO: do I need to check if a movie with that ID exists first?
    @DeleteMapping(value = "/{id}")
    public void deleteMovie(@PathVariable int id) {
        movieRepository.deleteById(id);
    }
}
