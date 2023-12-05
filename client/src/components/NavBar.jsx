import { useEffect, useState } from "react";
import "../assets/css/NavBar.css";
import { Autocomplete, TextField } from '@mui/material';
import useFetch from "../hooks/useFetch";

const NavBar = () => {

    // Fix the AutoComplete
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const handleSearch = async () => {
          if (searchTerm.length > 0) {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data.results);
          }
        };
        handleSearch();
      }, [searchTerm]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(searchTerm)
    }

    const handleSelect = (movie) => {
        console.log(searchResults)
        setSearchTerm(movie.original_title);
        console.log(searchTerm)
        setSearchResults([]);
      };


    return(
        <div className="navBar">
            <div className="logo">
                Cc
            </div>
            <div>
                <Autocomplete
                    id="search"
                    freeSolo
                    options={searchResults}
                    getOptionLabel={(option) => option.original_title}
                    renderOption={(option) => (
                        <li key={option.id} onClick={() => handleSelect}>
                            {option.key}
                            </li>
                      )}
                    renderInput={(params) => (
                        <TextField {...params} label="Search Movies..." variant="outlined" fullWidth onChange={handleChange} />
                    )}
                />
                <div>Log in</div>
            </div>
        </div>
    )
}

export default NavBar;