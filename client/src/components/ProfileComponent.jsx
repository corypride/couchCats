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
import RatingComponent from "./RatingComponent";
import AddToLogComponent from "./AddToLogComponent";
import DeleteFromLogComponent from "./DeleteFromLogComponent";
import DeleteAccountComponent from "./DeleteAccountComponent";
import WatchListButton from "./WatchListButton";

function ProfileComponent() {
    const { userInfo, userWatchList, userMovieLog } = useContext(userContext);
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
                    color="accent.main"
                >
                    Watch List
                </Typography>
            </Grid>
            {isWatchList() ? (
                // {/*TODO: Merve, review CSS for Watchlist, the Posters images are the wrong ratio, and should the cards be a fixed height?*/}
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
                                    {/* <Button size="small" color="attention" onClick={deleteMovieFromWatchList}>Delete</Button> */}
                                    <WatchListButton movie={movie}/>
                                </CardActions>
                                <CardActions>
                                    <AddToLogComponent 
                                        movie = {movie}
                                    />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </>

            ) : (
                <>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="accent.main">
                            There isn't any movie on your watch list
                        </Typography>
                    </Grid>
                </>
            )}

            <Grid item xs={12}>
                <Typography // title of the movie log
                    variant="h4"
                    padding={2}
                    color="accent.main"
                >
                    Movie Log
                </Typography>
            </Grid>
    {userMovieLog ? (
    <>
        {userMovieLog.map((entry, index) => ( //loop for logged movies 
            <Grid key={index} item xs={6} md={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component={"img"}
                        image={`https://image.tmdb.org/t/p/w500${entry.movie.poster}`}
                        title={entry.movie.title}
                        sx={{ height: 200, objectFit:'fill', padding: "1, 1" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" textAlign={"left"}>
                            {entry.movie.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign={"left"}>
                            {entry.movie.director}
                        </Typography>
                        <Typography gutterBottom variant="body2" color="text.secondary" textAlign={"left"}>
                            {entry.movie.description}
                        </Typography>
                        <RatingComponent 
                            movieId = {entry.movie.id}
                            userRating = {entry.userRating}
                        />
                        <Typography variant="body2" color="text.secondary" textAlign={"left"}>
                            Date added: {entry.dateAdded.slice(0,10)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <DeleteFromLogComponent 
                            movie = {entry.movie}
                        />
                    </CardActions>
                </Card>
            </Grid>
        ))}
    </>

) : (
    <>
        <Grid item xs={12}>
            <Typography variant="h6">
                Your movie log is currently empty
            </Typography>
        </Grid>
    </>
)}

<           Grid item xs={12}>
                <DeleteAccountComponent />
            </Grid>
        </Grid>
    );
}

export default ProfileComponent;