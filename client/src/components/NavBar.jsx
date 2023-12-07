import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <div className="container flex flex-rows justify-between">
            <div className="logo">
                Cc
            </div>
            <div id="linksContainer">
                <Link to="/">Home</Link>
                |
                <Link to="/filtersearch">Filter Search</Link>
            </div>
            <div className="flex flex-row">
                <div>Autocomplete</div>
                <div>Log in</div>
            </div>
        </div>
    )
}

export default NavBar;