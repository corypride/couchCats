import axios from 'axios';

const getMovieLog = async (userid) => {
    console.log("getMovieLog runs");
    const url = `http://localhost:8080/log/${userid}`;
  
    try {
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
export default getMovieLog;