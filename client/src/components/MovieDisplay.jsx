import axios from 'axios';
import { List, ListItem, Box, ListItemButton, Typography } from "@mui/material";
import getCastCrew from "../utils/getCastCrew"
import getServices from "../utils/getServices"
import { useEffect, useState } from 'react';
import tmdb_main from "../assets/tmdb_main.svg";
import streamingServices from '../assets/streamingServices';

const MovieDisplay = (props) => {

  const [services, setServices] = useState();
  const [castCrew, setCastCrew] = useState();
  const [director, setDirector] = useState();
  const [topCast, setTopCast] = useState();
  const [selected, setSelected] = useState(false);

  // adds movie to watchlist
  async function handleListAdd(movie, index) {
    try {

      const url = 'http://localhost:8081/watchlist/save'; // Replace with the actual API endpoint

      const movieData = {
        userId: 1,
        movie: {
          id: movie.id,
          title: movie.title,
          year: parseInt(movie.release_date.slice(0,4)),
          description: movie.overview,
          //TODO: need to change directors into string if there are multiple
          director: director.name,
          //TODO: need to change cast names into string
          cast: 'placeholder', 
          rating: movie.vote_average,
          poster: movie.poster_path
        }
      };
      const response = await axios.post(url, movieData);
      console.log('Response:', response.data);
      // setSelected(!selected); Actual place of selected
    } catch (error) {
      setSelected(!selected);
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
    if(castCrew) {
      setDirector(castCrew.crew.filter(({job})=> job ==='Director'))
      setTopCast(castCrew.cast.slice(0,3))
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
          {/* movie poster and add button-left side*/}
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
          </Box>
          {/* right side */}
          <Box 
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "50%",
            alignSelf: "flex-start",
            padding: "2rem"
          }}>
                {/* movie title and release year-top*/}
                <Box component="div"
                sx={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem"
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
                    alignSelf: "center",
                    color: "accent.main"
                  }}>{props.movie.release_date.slice(0,4)}</Typography>
                </Box>
                {/* overview-middle */}
                <Typography
                sx={{
                  marginBottom: "1rem",
                  color: "accent.main"
                }}>{props.movie.overview}</Typography>
                <Box
                  sx={{
                      display: "flex",
                      gap: "1rem"
                  }}>
                      <Box 
                      component="img" 
                      src={tmdb_main}
                      sx={{
                          width: "2rem"
                      }} />
                      <Typography
                      sx={{
                          fontSize: "1.5rem"
                      }}>{String(props.movie.vote_average).slice(0,3)}</Typography>
                  </Box>
                {/* director and top billed cast-middle */}
                <Box sx={{
                  display: "flex",
                  gap: "3rem",
                  marginBottom: "1rem"
                }}>
                    {/* director */}
                    <Box 
                    sx={{
                      display: "flex",
                      flexDirection: "column"
                    }}>
                        <Typography
                        sx={{
                          fontSize: "3rem"
                        }}>Director</Typography>
                        {director ? 
                          <>
                            {director.map((item) => (
                            <Typography
                            key={item.name}
                            sx={{
                              color: "accent.main"
                            }}>{item.name}</Typography>
                          ))}
                          </> 
                          : "No Director"}
                    </Box>
                    {/* Top Billed Cast */}
                    <Box 
                    sx={{
                      display: "flex",
                      flexDirection: "column"
                    }}>
                        <Typography
                        sx={{
                          fontSize: "3rem"
                        }}>Cast</Typography>
                        {topCast ? 
                          <>
                            {topCast.map((item) => (
                            <Typography
                            key={item.name}
                            sx={{
                              color: "accent.main"
                            }}>{item.name}</Typography>
                          ))}
                          </> 
                          : "No Top Billed"}
                    </Box>
                </Box>  
                {/* streaming services-bottom */}
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