import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Grid
} from "@mui/material";
import userContext from "../utils/userContext";
import DeleteAccountComponent from "./DeleteAccountComponent";

function ProfileComponent(movie, handleWatchList) {
    const { userInfo, userWatchList } = useContext(userContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo.isAuthenticated) {// if user not logged in then will redirect to login page
            navigate('/login')
        }
        if (userWatchList) {
        }
    });
    
    const isWatchList = () => {
        return userWatchList?.length > 0
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
            "userId": userInfo.id,
            "movieId": movie.id
        }
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
                    Welcome  {userInfo.firstName} {userInfo.lastName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography // welcome message line
                    variant="h6"
                    color="primary"
                    padding={2}
                    textAlign={"center"}
                >
                    E-mail: {userInfo.email}
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
                    {userWatchList.map((movie, index) => ( //loop for watch list movies 
                        <Grid key={index} item xs={6} md={3}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component={"img"}
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                                    title={movie.title}
                                    sx={{ height: 200, objectFit:'fill', padding: "1, 1" }}
                                />
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
                <DeleteAccountComponent />
            </Grid>
        </Grid>
    );
}

export default ProfileComponent;