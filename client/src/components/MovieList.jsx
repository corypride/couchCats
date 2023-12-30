import axios from 'axios';
import { List, ListItem, ListItemText, Box, ListItemButton, Typography } from "@mui/material";
import getCast from "../utils/getCast"
import getServices from "../utils/getServices"
import { useEffect, useState } from 'react';
import streamingServices from '../assets/streamingServices';

const MovieList = (props) => {

  const [services, setServices] = useState();
  const [cast, setCast] = useState();

  // adds movie to watchlist
  async function handleListAdd(movie) {
    try {

      const url = 'http://localhost:8081/watchlist/save'; // Replace with the actual API endpoint

      const movieData = {
        userId: 1,
        movie: {
          id: movie.id,
          description: movie.overview,
          poster: movie.poster_path,
          year: parseInt(movie.release_date.slice(0,4)),
          title: movie.title,
          director: 'placeholder',
          cast: 'placeholder',
          rating: movie.vote_average
        }
      };
  
      const response = await axios.post(url, movieData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //grabs cast and service from TMDB
  useEffect(() => {
    getServices(props.movie.id)
    .then(servicesResult => {
      console.log(servicesResult)
      setServices(servicesResult);
      })
    getCast(props.movie.id)
    .then(castResult => {
      console.log(castResult)
      setCast(castResult)
      })
  }, [props.movie])

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
          display: "flex",
          justifyContent: "center",

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
              }}>{props.movie.overview}</Typography>
              {services ? 
              <Box>
                <ListItemText>{services[0].provider_name}</ListItemText>
                <Box component="img" src={`https://image.tmdb.org/t/p/original/${services[0].logo_path}`} alt="stream logo" /> 
              </Box>

              : "Loading"}
                {/* service */}
          </Box>
        </ListItem>
      </List>
    )
  }

export default MovieList;