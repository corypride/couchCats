import axios from 'axios';

const getWatchList = async (id) => {
    const url = `http://localhost:8081/watchlist/${id}`;
  
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