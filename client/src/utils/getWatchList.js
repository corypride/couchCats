import axios from 'axios';

const getWatchList = async (user_id) => {
    const url = `http://localhost:8080/watchlist/${user_id}`;
  
    try {
      const response = await axios.get(url);
      const data = await response.data;
      return data; // flatrate is movies on subscription streaming
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
export default getWatchList;

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const useWatchList = (user_id) => {
//   const [watchList, setWatchList] = useState([]); // Store fetched genres here

//   useEffect(() => {
//     const fetchWatchList = async () => {
//     const url = `http://localhost:8081/watchlist/${user_id}`;
  
//     try {
//       const response = await axios.get(url);
//       const data = await response.data;
//       setWatchList(data) // flatrate is movies on subscription streaming
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };

//     fetchWatchList(); // Call the function on mount
//   }, [user_id]); // Empty dependency array ensures only one call

//   return watchList; // Return the state containing fetched genres
// };

// export default useWatchList;