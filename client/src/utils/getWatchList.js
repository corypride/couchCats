import axios from 'axios';

const getWatchList = async (id) => {
    const url = `http://localhost:8080/watchlist/${id}`;
  
    try {
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export default getWatchList;

//   import { useEffect, useState } from 'react';
// import axios from 'axios';

// const useWatchList = (id) => {
//   const [watchList, setWatchList] = useState([]); // Store fetched genres here
  
//   useEffect(() => {
//     const fetchWatchList = async () => {
//         const url = `http://localhost:8081/watchlist/${id}`;
      
//         try {
//           const response = await axios.get(url);
//           const data = await response.data;
//           setWatchList(data)
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       };

//     fetchWatchList(); // Call the function on mount
//   }, []); // Empty dependency array ensures only one call

//   return watchList; // Return the state containing fetched genres
// };

// export default useWatchList;
