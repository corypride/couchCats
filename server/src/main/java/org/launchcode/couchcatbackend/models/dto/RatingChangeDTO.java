package org.launchcode.couchcatbackend.models.dto;

import jakarta.validation.constraints.NotNull;
import org.launchcode.couchcatbackend.models.UserMovieLog;

public class RatingChangeDTO {
    @NotNull
    private UserMovieLog.UserMovieLogId userMovieLogId;

    @NotNull
    private int newRating;

    public RatingChangeDTO(){}

    public UserMovieLog.UserMovieLogId getUserMovieLogId() {
        return userMovieLogId;
    }

    public void setUserMovieLogId(UserMovieLog.UserMovieLogId userMovieLogId) {
        this.userMovieLogId = userMovieLogId;
    }

    public int getNewRating() {
        return newRating;
    }

    public void setNewRating(int newRating) {
        this.newRating = newRating;
    }
}
