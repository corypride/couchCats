import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Button, ToggleButton, ToggleButtonGroup, Box, Typography, SvgIcon,  } from "@mui/material";
import streamingServices from "../assets/streamingServices";
import MovieDisplay from "../components/MovieDisplay";
import getGenres from "../utils/getGenres";
import CastCrewSelect from "../components/CastCrewSelect";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const FilterSearch = () => {

  //FIXME:calls 4 times?
  const genres = getGenres();

  const serviceIds = streamingServices.map(service => service.id);
  const serviceReqDefault = serviceIds.join("|");

  //scroll references
  const results = useRef(null);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStreaming, setSelectedStreaming] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [params, setParams] = useState();
  const [queriedMovies, setQueriedMovies] = useState([]);

  const [singleResult, setSingleResult] = useState(false);
  const [singleRandom, setSingleRandom] = useState(0);
  const [display, setDisplay] = useState(false);

  //sx styles
  const toggleButtonGroupSx = {
    display: "grid",
    justifySelf: "center",
    gridTemplateColumns: "repeat(5, 1.5fr)",
    gridTemplateRows: "repeat(2, 0.75fr)",
    gap: "0.4rem",
    width: "75%",
  }

  const toggleButtonSx = {
    bgcolor: "primary.main",
    padding: "0.4rem",
    "&:hover": {
      color: "accent.main",
      bgcolor: "primary.main",
      borderColor: "#ff9610 !important"
    },
    "&.Mui-selected": {
      color: "accent.main",
      borderColor: "#ff9610 !important"
    },
    "&.MuiToggleButtonGroup-grouped": {
      borderRadius: "4px !important",
    }
  }

  const submitButtonSx = {
      marginTop: "3rem",
      marginBottom: "3rem",
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

  const handleCastCrewChange = (newValue) => {
    //put in array to simulate environment for mulitple options.
    setSelectedCrew([newValue]);
  }

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
      with_watch_providers: (!selectedStreaming.length < 1) ? selectedStreaming.join("|") : serviceReqDefault,
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
        //error handler when resuls is 0 (needs message)
        if(data.results.length > 0) {
          setSingleRandom(Math.floor(Math.random() * data.results.length));
          setQueriedMovies(data.results);
          setDisplay(true);
        } else setParams()
      } catch (error) {
        console.error(error);
      }
    };
    if(!params) return;
    else submit();
  }, [params]); //TODO: check for validation

  return (
      <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
{/* Genre Filters */}
          <Typography 
          variant="h4"
          sx={{
            color: "accent.main"
          }}>Genre</Typography>
          <br></br>
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
          <br></br><br></br>
          <Typography 
          variant="h4"
          sx={{
            color: "accent.main"
          }}>Streaming Service</Typography>
          <br></br>
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
            <br></br><br></br>
            <Typography 
              variant="h4"
              sx={{
                color: "accent.main"
              }}>Cast & Crew</Typography>
              <br></br>
            <CastCrewSelect handleCastCrewChange={handleCastCrewChange}/>
        </form>
{/* submit buttons */}
        <Box
        sx={{
          display: "flex",
          gap: "1rem"
        }}>
          <Button 
            variant="outlined"
            sx={submitButtonSx}
            onClick={() => {
              handleSubmit();
              setSingleResult(true);
              setDisplay(false);
            }}
            >Find One Movie!</Button>
          <Button 
            variant="outlined"
            sx={submitButtonSx}
            onClick={() => {
              handleSubmit();
              setDisplay(false);
              setSingleResult(false);
            }}
            >Give Me Options!</Button>
        </Box>
{/* Shows movie results */}
          {display ? 
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
                    fontSize: "5rem",
                    "&:hover": {
                      color: "accent.main"
                    }
                  }} component={KeyboardDoubleArrowUpIcon}/>
                  <Typography>Top</Typography>
              </Button> : ""}
{/* movie Results */}
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
            
            {(!display) ?
              null :
                singleResult ?
                  <MovieDisplay
                    movie={queriedMovies[singleRandom]}
                    />
                  :
                  queriedMovies.map((queriedMovie, index) => (
                    <MovieDisplay
                      key={index}
                      movie={queriedMovie}
                      />
                ))
              }
        </Box>
      </Box> 
    );
}

export default FilterSearch;

 // useEffect(() => {
  //   const url = "https://api.themoviedb.org/3/discover/movie";
  //   const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN;
  //   const randomizePage = async () => {
  //     try {
  //       const response = await axios.get(url, { params, 
  //         headers: { Authorization: `Bearer ${apiKey}` } 
  //       });
  //       const data = await response.data;
  //       const totalPages = data.total_pages;
  //       // console.log(Math.floor(Math.random() * totalPages))
  //       // Random page between 1 and total pages returned
  //       setPage(Math.floor(Math.random() * (totalPages) - 1) + 1)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }; 
  //   const submit = async () => {
  //     //API call with randomized page number
  //     try {
  //       // setParams(baseParameters);
  //       const response = await axios.get(url, { params, 
  //         headers: { Authorization: `Bearer ${apiKey}` } 
  //       });
  //       const data = await response.data;
  //       setQueriedMovies(data.results);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   if(!params) return;
  //   else {
  //     randomizePage();
  //     submit();
  //   } 
  // }, [randomize]);