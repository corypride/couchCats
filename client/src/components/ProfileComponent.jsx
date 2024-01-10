import React from "react";
import {
    Button,
    Typography,
    Card,
    CardContent,
    CardActions,
    Grid
} from "@mui/material";
import axios from "axios";
import DeleteAccountComponent from "./DeleteAccountComponent";

function ProfileComponent() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    user.watchlist = [
        // ... watchlist data ...
    ];

    const isWatchList = () => {
        return user?.watchlist?.length > 0;
    }

    // Function to delete a movie from the watch list
    const deleteMovieFromWatchList = (movie) => {
        console.log("delete a movie from watch list handle called")
        setTimeout(() => {
            const deleteMovieFromWatchlistUrl = "http://localhost:8080/watchlist/";

            const headersObj = {
                "Content-Type": "application/json"
            }

            const deletePayload = {
                "userId": user.id,
                "movieId": movie.id
            }

            // Axios DELETE request to remove the movie from the watchlist
            axios.delete(deleteMovieFromWatchlistUrl, { headers: headersObj, data: deletePayload })
                .then((response) => {
                    console.log(response);
                    // If deletion is successful, update the watchlist.
                    // The following line removes the selected movie from the watchlist.
                    // This operation may vary depending on the state management or data structures used.
                    // Example: setWatchlist(updatedWatchlist)
                    user.watchlist = user.watchlist.filter(item => item.id !== movie.id);
                })
                .catch(err => { console.error(err) });
        }, 2000)
    }

    // Function to delete the user account
    const deleteMyAccountHandle = () => {
        console.log("delete handle called")
        setTimeout(() => {
            const deleteUserUrl = "http://localhost:8080/user/delete/" + user.id;

            const headersObj = {
                "Content-Type": "application/json"
            }

            // Axios DELETE request for deleting the user account
            axios.delete(deleteUserUrl, { headers: headersObj })
                .then((response) => {
                    console.log(response);
                    // When the account is deleted, the user session might be closed.
                    // This depends on the used session management and application configuration.
                    // Example: logout() function call.
                })
                .catch(err => { console.error(err) });
        }, 2000)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" color="primary" padding={2} textAlign={"center"}>
                    Welcome {user.firstName} {user.lastName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" color="primary" padding={2} textAlign={"center"}>
                    E-mail: {user.email}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" padding={2}>
                    Watch List
                </Typography>
            </Grid>
            {isWatchList() ? (
                <>
                    {user.watchlist.map((movie, index) => (
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
                                    <Button size="small" color="attention" onClick={() => deleteMovieFromWatchList(movie)}>Delete</Button>
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
                {/* Component for deleting the user account */}
                <DeleteAccountComponent onDeleteAccount={deleteMyAccountHandle} />
            </Grid>
        </Grid>
    );
}

export default ProfileComponent;
