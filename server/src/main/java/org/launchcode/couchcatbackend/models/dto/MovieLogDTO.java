package org.launchcode.couchcatbackend.models.dto;

import jakarta.validation.constraints.NotNull;
import org.launchcode.couchcatbackend.models.Movie;

public class MovieLogDTO {
    @NotNull
    private int userId;

    @NotNull
    private Movie movie;

    @NotNull
    private int userRating;

    public MovieLogDTO(){}

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public int getUserRating() {
        return userRating;
    }

    public void setUserRating(int userRating) {
        this.userRating = userRating;
    }
}
