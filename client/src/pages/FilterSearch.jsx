import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "../assets/css/FilterSearch.css";
import streamingServices from "../assets/streamingServices";

const FilterSearch = () => {

  const [selectedGenres, setSelectedGenres] = useState();
  const [selectedStreaming, setSelectedStreaming] = useState();
  const [selectedCrew, setSelectedCrew] = useState();
  const [query, setQuery] = useState('')
  const [queriedMovies, setQueriedMovies] = useState();

   // Use fetch is calling 6 times
   const genreRequest = useFetch('https://api.themoviedb.org/3/genre/movie/list?language=en', process.env.REACT_APP_API_ACCESS_TOKEN);
   const genres = genreRequest.data?.genres;

   //using for sub information. Will create indiviual JSON file.
   const subscriptionRequest = useFetch('https://api.themoviedb.org/3/watch/providers/movie?language=en-US', process.env.REACT_APP_API_ACCESS_TOKEN);


  const handleGenreChange = (event, newValue) => {
    setSelectedGenres(newValue);
  };

  const handleStreamingChange = (event, newValue) => {
    setSelectedStreaming(newValue);
  };


  //make sure param is not in query when array is empty
  const handleSubmit = () => {
    let params = "";
    if(!selectedGenres < 1 || !selectedGenres === undefined) params += `&with_genres=${selectedGenres.join(',')}`;
    console.log(params)
    if(!selectedStreaming < 1 || !selectedStreaming === undefined) params += `&with_watch_providers=${selectedStreaming.join(',')}`;
    if(!selectedCrew < 1 || !selectedCrew === undefined) params += `&with_people=${selectedCrew.join(',')}`;
    setQuery(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=us${params}`);
    // &with_genres=56&with_people=6&with_watch_providers=8
  }

  useEffect(() => {
    const submit = async () => {
      console.log(query)
        const response = await fetch(query);
        const data = await response.json();
        setQueriedMovies(data.results);
        console.log(queriedMovies)
    };
    submit();
  }, [query]);

  //sideways transition to movie pages?

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