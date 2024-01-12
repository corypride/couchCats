
import React from 'react';
import { Box } from "@mui/material";
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
            {watchListMovies.map((movie) => (
                <MovieDisplay
                key={movie.id} 
                movie={movie} />
      ))}
        </Box>

    )
}
    
    
export default WatchList;


