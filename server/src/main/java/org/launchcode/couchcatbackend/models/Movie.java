package org.launchcode.couchcatbackend.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Movie {
    @Id
    private int id;

    @NotBlank
    @Size(min = 1, max = 300)
    private String title;
    private int year;

    @Size(max = 1000)
    private String description;

    @Size(max = 100)
    private String director;
    private String cast;
    private float rating;

    @Size(max = 200)
    private String poster;

    @ManyToMany(mappedBy = "movies")
    @JsonIgnore
    private List<User> users;

    public Movie(){
        this.users = new ArrayList<>();
    }

    public Movie(int id, String title, int year, String description, String director, String cast, float rating, String poster) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.description = description;
        this.director = director;
        this.cast = cast;
        this.rating = rating;
        this.poster = poster;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public List<User> getUsers() {
        return users;
    }

//    @Transactional
    public void addToUsers(User user) {
        users.add(user);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return year == movie.year && Float.compare(rating, movie.rating) == 0 && Objects.equals(title, movie.title) && Objects.equals(description, movie.description) && Objects.equals(director, movie.director) && Objects.equals(cast, movie.cast) && Objects.equals(poster, movie.poster);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, year, description, director, cast, rating, poster);
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", year=" + year +
                ", description='" + description + '\'' +
                ", director='" + director + '\'' +
                ", cast=" + cast +
                ", rating=" + rating +
                ", poster='" + poster + '\'' +
                '}';
    }
}
