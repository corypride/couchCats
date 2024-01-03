import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Button, ToggleButton, ToggleButtonGroup, Box, Typography, SvgIcon,  } from "@mui/material";
import streamingServices from "../assets/streamingServices";
import MovieDisplay from "../components/MovieDisplay";
import getGenres from "../utils/getGenres"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';



const FilterSearch = () => {

  //FIXME:calls 4 times?
  const genres = getGenres();

  //scroll references
  const results = useRef(null);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStreaming, setSelectedStreaming] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [params, setParams] = useState();
  const [queriedMovies, setQueriedMovies] = useState([]);

  //sx styles
  const toggleButtonGroupSx = {
    display: "grid",
    justifySelf: "center",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "5px",
    width: "75%",

  }

  const toggleButtonSx = {
    bgcolor: "primary.main",
    "&:hover": {
      color: "accent.main",
      bgcolor: "primary.main",
      //connect to theme accent.main
      border: "1px solid #ff9610"
    },
    "&.Mui-selected": {
      color: "accent.main",
      bgcolor: "primary.main"
    }
  }

  const submitButtonSx = {
      margin: "3rem",
      "&:hover": {
        color: "accent.main",
        //connect to theme accent.main
        border: "1px solid #ff9610"
      },
  }
  
  //handle functions
  const handleGenreChange = (event, newValue) => {
    setSelectedGenres(newValue);
  };

  const handleStreamingChange = (event, newValue) => {
    setSelectedStreaming(newValue);
  };

  const handleSubmit = () => {
    setParams({
      api_key: process.env.REACT_APP_API_KEY,
      include_adult: "false",
      include_video: "false",
      language: "en",
      page: 1,
      region: 'US',
      sort_by: 'popularity.desc',
      watch_region: 'US',
      with_genres: (!selectedGenres.length < 1 || !selectedGenres === undefined) ? selectedGenres.join("|") : undefined,
      with_people: (!selectedCrew.length < 1 || !selectedCrew === undefined) ? selectedCrew.join("|") : undefined,
      with_watch_providers: (!selectedStreaming.length < 1 || !selectedStreaming === undefined) ? selectedStreaming.join("|") : undefined,
    });
  }

  // handles scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (results.current) {
        results.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    handleScroll();
  }, [results, queriedMovies]);

  const handleScrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // handles submission of API query
  useEffect(() => {
    const submit = async () => {
      const url = "https://api.themoviedb.org/3/discover/movie";
      const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN;
      try {
        const response = await axios.get(url, { params, 
          headers: { Authorization: `Bearer ${apiKey}` } 
        });
        const data = await response.data;
        setQueriedMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    if(!params) return;
    else submit();
  }, [params]);


  //sideways transition to movie pages?
  // FIXME: outline of buttons not full

    return (
        <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <form style={{display: "grid"}}>
{/* Genre Filters */}
            <Typography variant="h4">Genre</Typography>
              <ToggleButtonGroup 
              id="genreContainer"
              value={selectedGenres}
              onChange={handleGenreChange}
              sx={toggleButtonGroupSx}
              >
                {genres ? genres.map((genre) => (
                  <ToggleButton variant="outlined" 
                  key={genre.name} 
                  id="genre" 
                  value={genre.id}
                  sx={toggleButtonSx}
                  >{genre.name}</ToggleButton>
                )) : (
                  "Loading"
                )}
              </ToggleButtonGroup>
{/* Streaming Service Filters */}
            <Typography variant="h4">Streaming Service</Typography>
              <ToggleButtonGroup 
              sx={toggleButtonGroupSx}
              value={selectedStreaming}
              onChange={handleStreamingChange}
              >
                {streamingServices.map((service) => (
                  <ToggleButton variant="outlined" 
                  key={service.name} 
                  id="genre" 
                  value={service.id}
                  sx={toggleButtonSx}
                  >{service.name}</ToggleButton>
                ))}
              </ToggleButtonGroup>
              {/* TODO: get crew suggestions */}
          </form>
          <Button 
          variant="outlined"
          sx={submitButtonSx}
          onClick={handleSubmit}>Find My Movie!</Button>
{/* Shows movie results */}
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5rem"
            }}
            ref={results}>
              {params ? 
                <Button 
                  onClick={handleScrollTop}
                  sx={{
                    alignSelf: "flex-end",
                    display: "flex",
                    flexDirection: "column",
                    position: "sticky",
                    top: "0"
                  }}>
                    <SvgIcon
                      sx={{
                        fontSize: "6rem"
                      }} component={KeyboardDoubleArrowUpIcon}/>
                      <Typography>Back</Typography>
                  </Button> : ""}

              {queriedMovies.slice(0,3).map((queriedMovie, index) => (
                <MovieDisplay
                  key={index}
                  movie={queriedMovie}
                  />
                ))}
          </Box>
        
        </Box> 
      );
}

export default FilterSearch;

// queriedMovies.length > 0 && 