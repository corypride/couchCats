# couchCats
Project for LaunchCodes' Liftoff Program

---

## API documentation

### MovieController - receive/input information about movies

#### Return all movies in database at /movies (GET)

Example output:
```
[
    {
        "id": 1,
        "title": "The Favourite",
        "year": 2015,
        "description": "intrigue",
        "director": "Yorgos Lanthimos",
        "cast": "Rachel Weisz and Olivia Colman",
        "rating": 5.0,
        "poster": "placeholder string"
    },
    {
        "id": 2,
        "title": "The Boy and the Heron",
        "year": 2023,
        "description": "animation",
        "director": "Hayao Miyazaki",
        "cast": "Robert Pattinson",
        "rating": 4.0,
        "poster": "placeholder string"
    }
]
```
#### Return one movie by ID at /movies/{id} (GET)

Example output:
```
{
    "id": 1,
    "title": "The Favourite",
    "year": 2015,
    "description": "intrigue",
    "director": "Yorgos Lanthimos",
    "cast": "Rachel Weisz and Olivia Colman",
    "rating": 5.0,
    "poster": "placeholder string"
}
```
#### Add movie to database at /movies/save (POST)

Example JSON request: 
```
{
    "id": 3,
    "title": "Killers of the Flower Moon",
    "year": 2023,
    "description": "placeholder description",
    "director": "Martin Scorsese",
    "cast": "Lily Gladstone, Leonardo DiCaprio",
    "rating": 5.0,
    "poster": "placeholder string"
}
```
#### Delete one movie from database at /movies/{id} (DELETE)

---

### WatchlistController - manage user watchlist

#### Return all movies on a user's watchlist at /watchlist/{userId} (GET)
Outputs same data format as /movies

#### Save movie to watchlist at /watchlist/save (POST)

*Note: previous version took a User object and a Movie object, but when testing with Postman this can overwrite the User watchlist when new movies are added.*

Example JSON request (takes a userId and a Movie object):

```
{
  "userId": 1,
  "movie": {
    "id": 12,
    "title": "The Favourite",
    "year": 2018,
    "description": "placeholder description",
    "director": "Yorgos Lanthimos",
    "cast": "Rachel Weisz and Olivia Colman",
    "rating": 5.0,
    "poster": "placeholder string"
	}
}
```

#### Delete movie from watchlist at /watchlist (DELETE)

Example JSON request (takes a user ID and a movie ID):

```
{
        "userId": 1,
        "movieId": 12
}
```
---

### LogController - manage user movie log

#### Return all of a user's logged movies at /log/{userId} (GET)

Example output:
```
[
    {
        "id": {
            "userId": 1,
            "movieId": 2
        },
        "user": {
            "id": 1,
            "firstName": "Yumi",
            "lastName": "Shiroma",
            "email": "ydshiroma@email.com",
            "password": "12345"
        },
        "movie": {
            "id": 2,
            "title": "The Boy and the Heron",
            "year": 2023,
            "description": "animation",
            "director": "Hayao Miyazaki",
            "cast": "Robert Pattinson",
            "rating": 4.0,
            "poster": "placeholder string"
        },
        "userRating": 4,
        "dateAdded": "2023-12-22T19:59:26.111+00:00"
    },
    {
        "id": {
            "userId": 1,
            "movieId": 21
        },
        "user": {
            "id": 1,
            "firstName": "Yumi",
            "lastName": "Shiroma",
            "email": "ydshiroma@email.com",
            "password": "12345"
        },
        "movie": {
            "id": 21,
            "title": "Doom Generation",
            "year": 1995,
            "description": "placeholder description",
            "director": "Gregg Araki",
            "cast": "James Duvall",
            "rating": 5.0,
            "poster": "placeholder string"
        },
        "userRating": 5,
        "dateAdded": "2023-12-23T21:49:24.980+00:00"
    }
]
```
#### Log a movie at /log/save (POST)

Example JSON request (takes a user ID and a movie ID):


```
{
  "userId": 1,
  "movie": {
            "id": 2,
            "title": "The Boy and the Heron",
            "year": 2023,
            "description": "animation",
            "director": "Hayao Miyazaki",
            "cast": "Robert Pattinson",
            "rating": 4.0,
            "poster": "placeholder string"
        },
  "userRating": 5
}
```

#### Change star rating for a logged movie (POST)

Coming soon to a theater near you

#### Delete movie from log at /log (DELETE)

**NOTE: Not currently working, will try to fix this soon!**

Would like to simplify this soon, but for now, pass in full UserMovieLog object to be deleted, for example:

```
{
        "id": {
            "userId": 1,
            "movieId": 2
        },
        "user": {
            "id": 1,
            "firstName": "Yumi",
            "lastName": "Shiroma",
            "email": "ydshiroma@email.com",
            "password": "12345"
        },
        "movie": {
            "id": 2,
            "title": "The Boy and the Heron",
            "year": 2023,
            "description": "animation",
            "director": "Hayao Miyazaki",
            "cast": "Robert Pattinson",
            "rating": 4.0,
            "poster": "placeholder string"
        },
        "userRating": 4,
        "dateAdded": "2023-12-22T19:59:26.111+00:00"
    }
```
