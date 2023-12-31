import axios from 'axios';
import { List, ListItem, Box, ListItemButton, Typography } from "@mui/material";
import getCastCrew from "../utils/getCastCrew"
import getServices from "../utils/getServices"
import { useEffect, useState } from 'react';
import streamingServices from '../assets/streamingServices';
import { ContentCutOutlined } from '@mui/icons-material';

const MovieDisplay = (props) => {

  const [services, setServices] = useState();
  const [castCrew, setCastCrew] = useState();
  const [director, setDirector] = useState();
  const [topCast, setTopCast] = useState();

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
          director: director.name,
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
      setServices(servicesResult);
      })
    getCastCrew(props.movie.id)
    .then(castCrewResult => {
      setCastCrew(castCrewResult)
      })
  }, [props.movie])

  useEffect(() => {
    // console.log(castCrew.crew.filter(({job})=> job ==='Director'))
    if(castCrew) {
      setDirector(castCrew.crew.filter(({job})=> job ==='Director'))
      setTopCast(castCrew.cast.slice(0,3))
      console.log(topCast)
    } 
  }, [castCrew])


  return (
      <List
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1.5rem",
        width: "60%"
      }}
      >
{/* title */}
        <ListItem
        key={props.movie.original_title}
        sx={{
          display: "flex",
          justifyContent: "center",

        }}>
          <Box component="div">
{/* movie poster */}
            <Box 
              sx={{
                height: "35rem",
                width: "25rem",
              }}
              component="img" 
              src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} 
              alt="movie poster" />
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
{/* movie title and release year*/}
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
{/* overview */}
              <Typography
              sx={{
              }}>{props.movie.overview}</Typography>
{/* director */}
              <Typography
              sx={{
                fontSize: "3rem"
              }}>Director</Typography>
              {director ? 
                <>
                  {director.map((item) => (
                  <Typography
                  key={item.name}>{item.name}</Typography>
                ))}
                </> 
                : "No Director"}
{/* Top Billed Cast */}
              <Typography
              sx={{
                fontSize: "3rem"
              }}>Top Billed</Typography>
              {director ? 
                <>
                  {topCast.map((item) => (
                  <Typography
                  key={item.name}>{item.name}</Typography>
                ))}
                </> 
                : "No Top Billed"}
{/* streaming services */}
              {services ? 
              <Box> 
                {services.map((service) => (
                  <Box 
                    key={service.provider_name}
                    sx={{
                      height: "4rem",
                      width: "4rem",
                      borderRadius: "5rem"
                    }}
                    component="img" 
                    src={`https://image.tmdb.org/t/p/original/${service.logo_path}`} alt="stream logo" />
                ))}
              </Box>
              : "Not on Streaming...."}
          </Box>
        </ListItem>
      </List>
    )
  }

export default MovieDisplay;