import { useState, useEffect } from 'react';

const useFetch = (url, apiKey) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, apiKey]);

  return { data, loading, error };
};

export default useFetch;

// const options = {
    
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTE3ZDg3YTE1YzBjMmNhYzkzN2EyYjIyMGRmMjM0NCIsInN1YiI6IjY1NmE1Nzk1ODg2MzQ4MDBjOWUwNjBjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O0DBNwaf7WcHrz7CifYh0si2HlajHHvb2TQqUOmz_28'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));