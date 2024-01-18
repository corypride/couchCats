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
                    sx={{
                        paddingBottom: "0"
                    }}
                >
                    Welcome,  
                    <Typography sx={{ color: "accent.main", fontSize: "2.5rem"}}>{userInfo.firstName} {userInfo.lastName}</Typography>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography // welcome message line
                    variant="h6"
                    color="primary"
                    padding={2}
                    textAlign={"center"}
                    sx={{ padding: "0", paddingBottom: "1rem"}}
                >
                    E-mail: 
                    <Typography sx={{color: "accent.main"}}>{userInfo.email}</Typography>
                </Typography>
                <Grid item xs={12}>
                    <DeleteAccountComponent />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography // title of the watch list
                    variant="h4"
                    color="accent.main"
                    padding={2}
                >
                    Watchlist
                </Typography>
            </Grid>
            {isWatchList() ? (
                // {/*TODO: Merve, review CSS for Watchlist, the Posters images are the wrong ratio, and should the cards be a fixed height?*/}
                <>
                    {userWatchList.map((movie, index) => ( //loop for watch list movies 
                        <Grid
                         key={index} 
                         item xs={6} 
                         md={3}>
                            <Card sx={{ width:"15rem", display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "accent.secondary" }}>
                                <CardMedia
                                    component={"img"}
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                                    title={movie.title}
                                    sx={{                     
                                        height: "25rem",
                                        width: "15rem" }}
                                />
                                <CardContent sx={{ padding: "0"}}>
                                    <Typography gutterBottom variant="h5" textAlign={"left"}>
                                        {movie.title}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ border: "3px solid #642B6B", padding: "0"}} >
                                    {/* as an example if we going to have this functionality
                                    <Button size="small">Watch</Button>
                                     */}
                                        <WatchListButton
                                            movie={movie}
                                            director={movie.director}
                                            topCast={movie.topCast}
                                        />
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
                        <Typography color="primary" variant="h6">
                            Your watchlist is currently empty
                        </Typography>
                    </Grid>
                </>
            )
            }

            <Grid item xs={12}>
                <Typography // title of the movie log
                    variant="h4"
                    color="accent.main"
                    padding={2}
                >
                    Movie Log
                </Typography>
            </Grid>
    {userMovieLog ? (
    <>
        {userMovieLog.map((entry, index) => ( //loop for logged movies 
            <Grid key={index} item xs={6} md={3} sx={{ marginBottom: "8rem" }}>
                <Card sx={{ width:"15rem", display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "accent.secondary" }}>
                    <CardMedia
                        component={"img"}
                        image={`https://image.tmdb.org/t/p/w500${entry.movie.poster}`}
                        title={entry.movie.title}
                        sx={{                     
                            height: "25rem",
                            width: "15rem" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" textAlign={"left"}>
                            {entry.movie.title}
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
                            <Typography color="primary" variant="h6">
                                Your movie log is currently empty
                            </Typography>
                        </Grid>
                    </>
                )
            }
        </Grid >
    );
}

export default ProfileComponent;