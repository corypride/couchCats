import { TextField} from "@mui/material";
import React, { useState, useEffect } from "react";

//need to clear as delete, fix list items
const Autocomplete = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [movieId, setMovieId] = useState(0);
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    useEffect(() => {
        const handleSearch = async () => {
          if (searchTerm.length > 0) {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`);
            console.log(response)
            const data = await response.json();
            setSearchResults(data.results);
          }
        };
        handleSearch();
      }, [searchTerm]);
  
    const handleClick = (result) => {
      setSearchTerm(result.title);
      setMovieId(result.id);
      setSearchResults([]); // Clear suggestions after selection
    };
  
    return (
      <div>
        <TextField
            variant="outlined"
            type="text"
            placeholder="Search Movies..."
            sx={{
              border: "5px solid white",
              bgcolor: "#642B6B"
            }}
            value={searchTerm}
            onChange={handleChange}
        />
        {searchTerm.length > 0 && (
          <ul>
            {searchResults.slice(0, 10).map((result) => (
              <ul 
              key={result.id}
              styles="position: absolute; width: 120px; display: block; padding: 0;"
              onClick={() => handleClick(result)}>
                {result.title}
              </ul>
            ))}
          </ul>
        )}
      </div>
    );
  };


export default Autocomplete;
