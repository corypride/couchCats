import databaseCall from './databaseCall.js';

const getWatchList = async (userInfo) => {
    try {
      const response = await databaseCall.get(`watchlist/${2}`);
      const data = await response.data;
      console.log(data)
      return data; // flatrate is movies on subscription streaming
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
export default getWatchList;

// import axios from 'axios';

// const getMovieLog = async (userid) => {
//     console.log("getMovieLog runs");
//     const url = `http://localhost:8080/log/${userid}`;
  
//     try {
//       const response = await axios.get(url);
//       const data = await response.data;
//       return data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };
  
// export default getMovieLog;