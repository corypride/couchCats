package org.launchcode.couchcatbackend.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;

@Entity
public class UserMovieLog {
    @EmbeddedId
    private UserMovieLogId id = new UserMovieLogId();

    @ManyToOne
    @MapsId("userId")
    private User user;

    @ManyToOne@MapsId("movieId")
    private Movie movie;

    private int rating;

    @CreationTimestamp
    private Date dateAdded;

    public UserMovieLog() {}

    public UserMovieLog(UserMovieLogId id, int rating) {
        this.id = id;
        this.rating = rating;
    }

    public UserMovieLogId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Movie getMovie() {
        return movie;
    }

    public int getRating() {
        return rating;
    }

    public Date getDateAdded() {
        return dateAdded;
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
    }
}