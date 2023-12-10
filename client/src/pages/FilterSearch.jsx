import { useState } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "../assets/css/FilterSearch.css";
import streamingServices from "../assets/streamingServices";

const FilterSearch = () => {

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStreaming, setSelectedStreaming] = useState([]);
  const [queryMovies, setQueryMovies] = useState([]);

   // Use fetch is calling 6 times
   const genreRequest = useFetch('https://api.themoviedb.org/3/genre/movie/list?language=en', process.env.REACT_APP_API_ACCESS_TOKEN);
   const genres = genreRequest.data?.genres;

   //using for sub information. Will create indiviual JSON file.
   const subscriptionRequest = useFetch('https://api.themoviedb.org/3/watch/providers/movie?language=en-US', process.env.REACT_APP_API_ACCESS_TOKEN);


  const handleGenreChange = (event, newValue) => {
    setSelectedGenres(newValue);
    console.log('Selected value:', newValue);
  };

  const handleStreamingChange = (event, newValue) => {
    setSelectedStreaming(newValue);
    console.log('Selected value:', newValue);
  };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("hi")
    }

    return (
        <div>
          <NavBar />
          <form>
            <h1>Genre</h1>
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
                  >{genre.name}</ToggleButton>
                )) : (
                  "Loading"
                )}
              </ToggleButtonGroup>
            <h1>Streaming Service</h1>
              <ToggleButtonGroup 
              id="genreContainer"
              value={selectedStreaming}
              onChange={handleStreamingChange}
              >
                {streamingServices.map((service) => (
                  <ToggleButton variant="outlined" 
                  key={service.name} 
                  id="genre" 
                  value={service.id}
                  >{service.name}</ToggleButton>
                ))}
              </ToggleButtonGroup>
          </form>
          <Button variant="outlined" onClick={handleSubmit}>Find My Movie!</Button>
        </div>
      );
}

export default FilterSearch;