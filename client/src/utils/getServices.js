import axios from 'axios';

// const getServices = (id) => {

//     const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
//     const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN;
    
//     const services = async () => {
//         try {
//         const response = await axios.get(url, {  
//             headers: 
//             { 
//                 accept: 'application/json', 
//                 Authorization: `Bearer ${apiKey}` 
//             } 
//         });
//         const data = await response.data;
//         return data.results.US.flatrate
//         } catch (error) {
//         console.error(error);
//         }
//     }
//     return services();
// }

// export default getServices;

const getServices = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
    const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN;
  
    try {
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.data;
      return data.results.US.flatrate; // flatrate is movies on subscription streaming
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export default getServices;