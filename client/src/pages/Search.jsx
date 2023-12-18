import { useEffect, useState } from "react";
import axios from 'axios';
import "../assets/css/Search.css";
import { Button, ToggleButton, ToggleButtonGroup, List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import streamingServices from "../assets/streamingServices";
import getGenres from "../assets/getGenres"

const FilterSearch = () => {

  const url = "https://api.themoviedb.org/3/discover/movie"
  const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN;
  //calls 4 times?
  const genres = getGenres();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStreaming, setSelectedStreaming] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [params, setParams] = useState({
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: '1',
    region: 'US',
    sort_by: 'popularity.desc',
    watch_region: 'US',
  })
  const [queriedMovies, setQueriedMovies] = useState([]);
  
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
      with_genres: (!selectedGenres.length < 1 || !selectedGenres === undefined) ? selectedGenres.join(",") : undefined,
      with_people: (!selectedCrew.length < 1 || !selectedCrew === undefined) ? selectedCrew.join(",") : undefined,
      with_watch_providers: (!selectedStreaming.length < 1 || !selectedStreaming === undefined) ? selectedStreaming.join(",") : undefined,
    })
  }
  
  const handleListAdd = () => {

  }

  useEffect(() => {
    const submit = async () => {
      try {
        const response = await axios.get(url, { params, headers: { Authorization: `Bearer ${apiKey}` } });
        const data = await response.data;
        setQueriedMovies(data.results);
      } catch (error) {
        console.log(params)
        console.error(error);
      }
    };
    submit();
  }, [params]);

  //sideways transition to movie pages?

    return (
        <Box>
          <form >
{/* Genre Filters */}
            <Typography variant="h4">Genre</Typography>
              <ToggleButtonGroup 
              id="genreContainer"
              value={selectedGenres}
              onChange={handleGenreChange}
              >
                {genres ? genres.map((genre) => (
                  <ToggleButton variant="outlined" 
                  key={genre.name} 
                  id="genre" 
                  value={genre.id}
                  sx={{
                    bgcolor: "#642B6B",
                    borderRadius: "16px",
                    width: "75%"
                  }}
                  >{genre.name}</ToggleButton>
                )) : (
                  "Loading"
                )}
              </ToggleButtonGroup>
{/* Streaming Service Filters */}
            <Typography variant="h4">Streaming Service</Typography>
              <ToggleButtonGroup 
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)", 
                gap: "5px" 
              }}
              value={selectedStreaming}
              onChange={handleStreamingChange}
              >
                {streamingServices.map((service) => (
                  <ToggleButton variant="outlined" 
                  key={service.name} 
                  id="genre" 
                  value={service.id}
                  sx={{
                    bgcolor: "#642B6B",
                    borderRadius: "10px",
                    width: "75%"
                  }}
                  >{service.name}</ToggleButton>
                ))}
              </ToggleButtonGroup>
          </form>
          <Button 
          variant="outlined"
          sx={{
            margin: "3rem"
          }}
          onClick={handleSubmit}>Find My Movie!</Button>
{/* Shows movie results */}
          <List
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "1.5rem"
          }}
          >
            {queriedMovies.slice(0,3).map(item => (
              <ListItem
              key={item.original_title}
              sx={{
                flexGrow: "2",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap"
              }}>
                <Box component="img" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="movie poster" />
                <ListItemText 
                primary={item.original_title}
                sx={{

                }}
                />
                <ListItemText primary={item.overview}/>
                {/* <ListItemText primary={need id for services}/> */}
                <Button
                variant="cont"
                onClick={handleListAdd}
                sx={{
                  bgcolor: "gold"
                }}
                >Add</Button>
              </ListItem>
            ))}
          </List>

        </Box>
      );
}

export default FilterSearch;

// queriedMovies.length > 0 && 