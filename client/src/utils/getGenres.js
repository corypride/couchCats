import { useEffect, useState } from 'react';
import axios from 'axios';

const useGenres = () => {
  const [genres, setGenres] = useState([]); // Store fetched genres here
  const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN; 
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list?language=en',
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const data = await response.data;
        setGenres(data.genres); // Update state with fetched genres
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres(); // Call the function on mount
  }, []); // Empty dependency array ensures only one call

  return genres; // Return the state containing fetched genres
};

export default useGenres;

