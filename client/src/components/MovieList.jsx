import axios from 'axios';
import { List, ListItem, ListItemText, Box, ListItemButton, Typography } from "@mui/material";
import getServices from "../utils/getServices"
import { useEffect, useState } from 'react';

const MovieList = (props) => {

  async function handleListAdd(item) {
    try {

      const url = 'http://localhost:8081/watchlist/save'; // Replace with the actual API endpoint

      const movieData = {
        id: 492008,
        title: '검객',
        description: 'After being blinded in a coup against the king, Joseon\'s greatest swordsman goes into hiding, far removed from his city\'s anguish. But when traffickers kidnap his daughter, he has no choice but to unsheathe his sword once more.',
        poster: '/r08U3dwiOeStXcjYmfnRyumgKyq.jpg',
        year: '2021-02-16',
        title: 'The Swordsman',
        rating: 7.5,
      };
  
      const response = await axios.post(url, movieData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

    // getServices(props.movie.id)
    // .then((services) => {
    //   services.map((service) => (
    //     <ListItem></ListItem>
    //   ))
    // })

    getServices(976573)
  .then(service => {
  console.log(service)
  })

  return (
      <List
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1.5rem",
        width: "60%"
      }}
      >
          <ListItem
          key={props.movie.original_title}
          sx={{
            display: "flex"
          }}>
            <Box component="div">
              <Box component="img" src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt="movie poster" />
              <ListItemButton
                variant="cont"
                onClick={() => handleListAdd(props.movie)}
                sx={{
                  flexGrow: "0",
                  bgcolor: "accent.main"
                }}
                >Add</ListItemButton>
            </Box>
            <Box 
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "50%",
              alignSelf: "flex-start",
            }}>
              <Box component="div"
              sx={{
                display: "flex",
                gap: "1rem"
              }}>
                <Typography
                  sx={{
                    alignSelf: "flex-start",
                    fontSize: "2.5rem",
                    fontWeight: "bold"
                  }}
                  >{props.movie.original_title}</Typography>
                <Typography
                sx={{
                  alignSelf: "center"
                }}>{props.movie.release_date.slice(0,4)}</Typography>
              </Box>

                <Typography
                sx={{
                  width: "70%"
                }}>{props.movie.overview}</Typography>

                  {/* service */}
            </Box>
          </ListItem>
      </List>
    )
  }

export default MovieList;