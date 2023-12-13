import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { Button, ToggleButton, ToggleButtonGroup, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import "../assets/css/Search.css";
import streamingServices from "../assets/streamingServices";

const FilterSearch = () => {

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStreaming, setSelectedStreaming] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [query, setQuery] = useState('')
  const [queriedMovies, setQueriedMovies] = useState([]);

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
    if(!selectedGenres.length < 1 || !selectedGenres === undefined) params += `&with_genres=${selectedGenres.join('|')}`;
    if(!selectedStreaming.length < 1 || !selectedStreaming === undefined) params += `&with_watch_providers=${selectedStreaming.join('|')}`;
    if(!selectedCrew.length < 1 || !selectedCrew === undefined) params += `&with_people=${selectedCrew.join(',')}`;
    setQuery(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=us${params}`);
    // &with_genres=56&with_people=6&with_watch_providers=8
    console.log(params)
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
          <form >
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
                  sx={{
                    bgcolor: "#642B6B",
                    borderRadius: "10px",
                    width: "75%"
                  }}
                  >{service.name}</ToggleButton>
                ))}
              </ToggleButtonGroup>
          </form>
          <Button variant="outlined" onClick={handleSubmit}>Find My Movie!</Button>
          <List
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          >
            {queriedMovies.slice(0,3).map(item => (
              <ListItem>
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="movie poster" />
                <ListItemText primary={item.original_title}/>
              </ListItem>
            ))}
          </List>

        </div>
      );
}

export default FilterSearch;

// queriedMovies.length > 0 && 