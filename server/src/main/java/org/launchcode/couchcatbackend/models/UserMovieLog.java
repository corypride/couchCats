package org.launchcode.couchcatbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;

@Entity
public class UserMovieLog {
    @EmbeddedId
    private UserMovieLogId id = new UserMovieLogId();

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("userId")
    @JsonIgnore
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("movieId")
    private Movie movie;

    @Min(value = 1, message = "Rating must be between 1 and 5 stars")
    @Max(value = 5, message = "Rating must be between 1 and 5 stars")
    private int userRating;

    @CreationTimestamp
    private Date dateAdded;

    public UserMovieLog() {}

    public UserMovieLog(UserMovieLogId id, int userRating) {
        this.id = id;
        this.userRating = userRating;
    }

    public UserMovieLogId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Date getDateAdded() {
        return dateAdded;
    }

    @Override
    public String toString() {
        return "UserMovieLog{" +
                "id=" + id +
                ", user=" + user +
                ", movie=" + movie +
                ", userRating=" + userRating +
                ", dateAdded=" + dateAdded +
                '}';
    }

    @Embeddable
    public static class UserMovieLogId implements Serializable {
        private static final long serialVersionUID = 1L;
        //    long?
        private int userId;
        private int movieId;

        public UserMovieLogId(){}

        public UserMovieLogId(int userId, int movieId) {
            super(); //is this necessary?
            this.userId = userId;
            this.movieId = movieId;
        }

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public int getMovieId() {
            return movieId;
        }

        public void setMovieId(int movieId) {
            this.movieId = movieId;
        }

        @Override
        public String toString() {
            return "UserMovieLogId{" +
                    "userId=" + userId +
                    ", movieId=" + movieId +
                    '}';
        }
    }
}