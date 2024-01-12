import databaseCall from './databaseCall.js';

const getUserMovieLog = async (userInfo) => {
    try {
      const response = await databaseCall.get(`log/${userInfo.id}`);
      const data = await response.data;
      console.log(data)
      return data; // flatrate is movies on subscription streaming
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
export default getUserMovieLog;