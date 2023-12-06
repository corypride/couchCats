package org.launchcode.couchcatbackend.controllers;

import jakarta.validation.Valid;
import org.launchcode.couchcatbackend.data.MovieRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class WatchlistController {

    @Autowired
    private MovieRepository movieRepository;

//    TODO: autowired userRepository

//    TODO: add to watchlist from home page = get mapping?
    public String addToWatchlistFromHome(@ModelAttribute @Valid Movie newMovie, Errors errors) {
//        TODO: do we need a Model object in the parameters or will React handle all that?
        if (errors.hasErrors()) {
//            TODO: do something? or don't?
        }
        movieRepository.save(newMovie);

        return "do we even need to return a string here?";
    }
//    TODO: add to watchlist from search results = get mapping?
//    TODO: delete from watchlist from watchlist page = post mapping?
//    or are all of them both get and post because you need to get the movie ID in question then post a command back to the database...?

//    if the React app needs to read info out of the database, how will it do that? by sending a get request to one of our java controllers?

    @GetMapping("watchlist")
    public String watchlistTest() {
        return "this is a test";
    }
}
