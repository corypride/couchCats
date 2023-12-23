package org.launchcode.couchcatbackend.models.dto;

import jakarta.validation.constraints.NotNull;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;

public class UserMovieDTO {
    @NotNull
    private int userId;

    @NotNull
    private Movie movie;

    public UserMovieDTO() {}

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
}
