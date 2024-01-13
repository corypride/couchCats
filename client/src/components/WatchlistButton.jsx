import React, { useContext, useEffect, useState } from "react";
import { ListItemButton } from "@mui/material";
import userContext from "../utils/userContext";

const WatchListButton = ({ movie, director, topCast }) => {
  const [selected, setSelected] = useState(false);

  const { userWatchList, userInfo, refetchDb, setRefetchDb, databaseCall } = useContext(userContext)

  async function handleWatchList() {
    
    const movieDataPOST = {
      userId: userInfo.id,
      movie: {
        id: movie.id,
        title: movie.title,
        year: parseInt(movie.release_date.slice(0,4)),
        description: movie.overview,
        director: director[0].name,
        cast: topCast[0].name,
        rating: movie.vote_average,
        poster: movie.poster_path
      }
    };

    const dataDelete = {
      userId: userInfo.id,
      movieId: movie.id
    }


    // if movie is selected(in userWatchList), POST. Else, Delete.
    if(!selected) {
      try {
        const response = await databaseCall.post('/watchlist/save', movieDataPOST);
        console.log('Response:', response.data);
        setSelected(true);
        setRefetchDb(!refetchDb)
      } catch (error) {
        if (error.response) {
          console.log("Error data:", error.response.data);
          console.log("Error status:", error.response.status);
          console.log("Error headers:", error.response.headers);
    
          // TODO: ERIN: Display a custom message to the user, 
          // letting them know they cannot add a movie when they are not logged in and 
          // prompting them to register and offering a link to the register page, with the ability to close the box easily
          alert("Error: " + error.response.data);
      }
        console.error('Error:', error);
      }
    } else {
      try {
          const response = await databaseCall.delete('/watchlist', {
            data: dataDelete
          });
          console.log('Response:', response.data);
          setSelected(false);
          setRefetchDb(!refetchDb)
        } catch (error) {
          console.error('Error:', error);
      }
    }
  }

  useEffect(() => {
      if(userInfo.id)
        if(userWatchList?.some((item)=> item.id === movie.id)) {
          setSelected(true);
      }
    }, [userWatchList, movie.id, userInfo.id])
   
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
        
export default WatchListButton;


