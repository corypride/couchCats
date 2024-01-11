import { TextField, Autocomplete, Stack, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//need to clear as delete, fix list items
const AutocompleteMUI = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    useEffect(() => {
        const handleSearch = async () => {
          if (searchTerm.length > 0) {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`);
            // console.log(response)
            const data = await response.json();
            setSearchResults(data.results);
          }
        };
        handleSearch();
      }, [searchTerm]);

    // TODO: styling
  
    return (
        <Stack 
          spacing={2} 
          sx={{
            width: "15vw"
            }}>
          <Autocomplete
          // open
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              ".MuiAutocompleteListbox-option": {
                justifyContent: "space-between"
              }
            }}
            freeSolo
            onChange={
              (event, value) => {
                if(!value) {
                  return
                } else {
                  navigate(`/movie`, { state: { value } })
                }

              } 

              // console.log(value)
            }
            options={searchResults}
            getOptionLabel={(option) => option.original_title}
            noOptionsText="No movies fit that criteria..."
            renderOption={(props, option) => {
              return (
                  <Box
                    {...props} 
                    key={option.id}
                    sx={{
                      width: "100%"
                    }}>
                        <Typography>{option.original_title}</Typography>
                        <Typography>{option.release_date.slice(0,4)}</Typography>
                  </Box>
              );
            }}
            renderInput={(params) => 
              <TextField
                sx={{
                  input: {
                    color: "accent.main"
                  },
                  "& .MuiFormLabel-root": {
                    color: "accent.main"
                  },
                  "& .Mui-focused": {
                    color: "accent.main"
                  }
                }}
                onChange={handleChange}
                {...params} label="Seach Movies..." />}
               />
        </Stack>
    );
  };


export default AutocompleteMUI;
