import React from "react";
import {
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Grid
} from "@mui/material";
import axios from "axios";

function ProfileComponent() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    user.watchlist = [
        { title: "Batman", year: "1997", description: "movie description", director: "Batman Director" },
        { title: "Superman", year: "1998", description: "movie description", director: "Superman Director" },
        { title: "Batman", year: "1997", description: "movie description", director: "Batman Director" },
        { title: "Killers of the Flower Moon", year: "2023-10-18", description: "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.", director: "Batman Director" },
        { title: "Superman", year: "1998", description: "movie description", director: "Superman Director" },
        { title: "Superman", year: "2023-10-18", description: "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.", director: "Superman Director" }
    ];

    const isWatchList = () => {
        return user?.watchlist?.length > 0
    }

    const deleteMovieFromWatchList = (movie) => { // deletes a movie from the watch list
        console.log("delete a movie from watch list handle called")
        setTimeout(() => {
        }, 2000)

        const deleteMovieFromWatchlistUrl = "http://localhost:8080/watchlist/";

        const headersObj = {
            "Content-Type": "application/json"
        }

        const deletePayload = {
            "userId": user.id,
            "movieId": movie.id
        }
    }


    const deleteMyAccountHandle = () => { // deletes the account 
        console.log("delete handle called")
        setTimeout(() => {
        }, 2000)

        const deleteUserUrl = "http://localhost:8080/user/delete/" + user.id;

        const headersObj = {
            "Content-Type": "application/json"
        }
        // Delete methode for account
        axios.delete(deleteUserUrl, { headers: headersObj })
            .then((response) => {
                console.log(response)
            })
            .catch(err => { console.error(err) });
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography // welcome message line
                    variant="h4"
                    color="primary"
                    padding={2}
                    textAlign={"center"}
                >
                    Welcome  {user.firstName} {user.lastName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography // welcome message line
                    variant="h6"
                    color="primary"
                    padding={2}
                    textAlign={"center"}
                >
                    E-mail: {user.email}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography // title of the watch list
                    variant="h4"
                    padding={2}
                >
                    Watch List
                </Typography>
            </Grid>
            {isWatchList() ? (
                <>
                    {user.watchlist.map((movie, index) => ( //loop for watch list movies 
                        <Grid key={index} item xs={6} md={3}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" textAlign={"left"}>
                                        {movie.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign={"left"}>
                                        {movie.director}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign={"left"}>
                                        {movie.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Watch</Button>
                                    <Button size="small" color="attention" onClick={deleteMovieFromWatchList}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </>

            ) : (
                <>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            There isn't any movie on your watch list
                        </Typography>
                    </Grid>
                </>
            )}

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="attention"
                    sx={{ marginTop: "1.5rem", color: "white" }}
                    onClick={deleteMyAccountHandle}
                >
                    Delete My Account!
                </Button>
            </Grid>
        </Grid>
    );
}

export default ProfileComponent;