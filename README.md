# couchCats
Project for LaunchCodes' Liftoff Program

---

# API documentation

## MovieController - receive/input information about movies

### Return all movies in database at /movies (GET)

### Return one movie by ID at /movies/{id} (GET)

### Add movie to database at /movies/save (POST)

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

### Delete one movie from database at /movies/{id} (DELETE)

---

## WatchlistController - manage user watchlist

### Return all movies on a user's watchlist at /watchlist/{userId} (GET)

### Save movie to watchlist at /watchlist/save (POST)

Example JSON request:

(Currently takes a User object and a Movie object. Should I refactor this to take a userId instead?)

```
{
  "user": {
    "id": 1,
    "firstName": "Yumi",
    "lastName": "Shiroma",
    "email": "ydshiroma@email.com",
    "password": "12345",
    "watchlist": []
	},
  "movie": {
    "id": 5,
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

---

## LogController - manage user movie log