package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
//      TODO: is code for throwing an exception correct?
        return movieRepository.findById(id).orElseThrow(RuntimeException::new);
    }

//    Add movie to database at /movies/save
    @PostMapping(path = "/save")
    public void saveMovie(@RequestBody Movie movie) {
        movieRepository.save(movie);
    }

//    Delete one movie from database at /movies/{id}
    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteMovie(@PathVariable int id) {
        Optional<Movie> result = movieRepository.findById(id);
        if (result.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            movieRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
    }

}
