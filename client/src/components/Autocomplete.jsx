import { Input, TextField } from "@mui/material";
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
          if (searchTerm.length > 1) {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`);
            const data = await response.json();
            console.log(data)
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
            value={searchTerm}
            onChange={handleChange}
        />
        {searchResults && (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id} onClick={() => handleClick(result)}>
                {result.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };


export default Autocomplete;