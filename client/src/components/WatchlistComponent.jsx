
import React, { useEffect, useState, useContext } from 'react';
import { Box } from "@mui/material";
import userContext from "../utils/userContext";
import MovieDisplay from "./MovieDisplay"; // Import the MovieDisplay component

const Watchlist = (props) => {
    const { userWatchlist } = props;


    return (
        // {userWatchlist.map(movie)}
        <Box
        sx={{
            display: "flex",
            justifyContent: "center"
        }}>
            <MovieDisplay
            movie={userWatchlist[0]}
            />
        </Box>

    )
}
    
    
export default WatchList;


