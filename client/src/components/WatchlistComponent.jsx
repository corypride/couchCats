
import React, { useEffect, useState, useContext } from 'react';
import { Box } from "@mui/material";
import userContext from "../utils/userContext";
import MovieDisplay from "./MovieDisplay"; // Import the MovieDisplay component

const Watchlist = (props) => {
    const { movie, handleWatchList } = props;
    const [selected, setSelected] = useState(false);


    return (
    <ListItemButton
    variant="cont"
    onClick={() => handleWatchList(movie)}
    selected={selected}
    sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "accent.main",
         width: "6rem",
        "&.Mui-selected": {
         backgroundColor: "primary.main", // Apply custom styling when selected
         color: "white",
        },
        "&:hover": {
            backgroundColor: "accent.secondary",
            color: "white" // Hover styles override selected background
        },
    }}
    >{selected ? "Added" : "Add"}</ListItemButton>
    )
}
    
export default WatchList;

const [selected, setSelected] = useState(false);
