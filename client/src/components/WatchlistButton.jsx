import React, { useContext, useEffect, useState } from "react";
import { ListItemButton, SvgIcon, Typography, Box } from "@mui/material";
import userContext from "../utils/userContext";
import StarIcon from '@mui/icons-material/Star';

const WatchListButton = ({ movie, director, topCast }) => {
  const [selected, setSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
                  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                  selected={selected}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    bgcolor: "accent.secondary",
                    width: "20%",
                    padding: "0",
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "accent.main",
                      "&:hover": {
                        backgroundColor: "accent.secondary",
                        color: "accent.main"
                      }
                    },
                    "&:hover": {
                      backgroundColor: "primary.main"
                    },
                  }}
                  >
                    {selected ?
                      <SvgIcon
                      component={StarIcon}/> 
                      : 
                      <Box
                      sx={{
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <SvgIcon
                        component={StarIcon}/>
                        {/* {isHovered ? 
                          <Box
                            sx={{
                              transition: 'max-width 0.3s ease-in-out', // Transition for smooth roll-out
                              overflow: 'hidden',
                              maxWidth: isHovered ? '200px' : '0px', // Adjust heights as needed
                            }}
                          >
                            Add to WatchList
                          </Box>
                        :
                        null} */}

                      </Box>

                      }
        </ListItemButton>
      )
}
        
export default WatchListButton;


