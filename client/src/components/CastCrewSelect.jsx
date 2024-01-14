import { TextField, Autocomplete, Stack, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";

const CastCrewSelect = ({handleCastCrewChange}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    useEffect(() => {
        const handleSearch = async () => {
          if (searchTerm.length > 0) {
            const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data.results.slice(0, 6));
          }
        };
        handleSearch();
      }, [searchTerm]);

    return(
        <Stack 
          spacing={2} 
          sx={{
            width: "15vw",
            alignSelf: "center"
            }}>
          <Autocomplete
          // open={true}
            sx={{
              backgroundColor: "primary.main",
            }}
            freeSolo
            onChange={
                (event, value) => {
                  if(!value) {
                    return
                  } else {
                    handleCastCrewChange(value.id);
                  }
                } 
              }
            options={searchResults}
            getOptionLabel={(option) => option.name}
            noOptionsText="No movies fit that criteria..."
            renderOption={(props, option) => {
              return (
                  <Box
                    {...props} 
                    key={option.id}
                    component="div"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                        <Typography>{option.name}</Typography>
                  </Box>
              );
            }}
            renderInput={(params) => 
              <TextField
                sx={{
                    color: "accent.main",
                    input: {
                        color: "accent.main",
                    },
                    "& .MuiFormLabel-root": {
                        color: "accent.main"
                    },
                    "& .MuiFormLabel-focused": {
                        color: "accent.main",
                        borderColor: "accent.main"
                    }
                }}
                onChange={handleChange}
                {...params} label="Cast & Crew" />}
               />
        </Stack>
    )
}

export default CastCrewSelect;