import React, { useContext, useEffect, useState } from "react";
import { ListItemButton } from "@mui/material";
import userContext from "../utils/userContext";

const WatchListButton = ({ movie, director, topCast, services, castCrew }) => {
  const { userWatchList, userInfo, refetchDb, setRefetchDb, databaseCall } = useContext(userContext)
  const [selected, setSelected] = useState(false);

  async function handleWatchList() {
    
    const movieDataPOST = {
      userId: userInfo.id,
      movie: {
        id: movie.id,
        title: movie.title,
        year: parseInt(movie.release_date.slice(0,4)),
        description: movie.overview,
        //TODO: need to change directors into string if there are multiple
        director: director[0].name,
        //TODO: need to change cast names into string
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


