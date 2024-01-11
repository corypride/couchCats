import axios from 'axios';

const databaseCall = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true
  })

const headersObj = {
"Content-Type": "application/json",
};

databaseCall.interceptors.request.use(async (config) => {
    try {
      const response = await axios.get(`http://localhost:8081/user/secure`, { headers: headersObj, withCredentials: true });
      console.log("success")
      console.log("response from test => ", response);
      return config;
    } catch (error) {
      // set Authentication to false
      return Promise.reject(error); // Return a rejected Promise to propagate the error
    }
  });

export default databaseCall;

// databaseCall.interceptors.request.use((config) => {
//     console.log("WORKED")
//     axios.get(`http://localhost:8081/user/secure`, { headers: headersObj, withCredentials: true })
//     .then(response => {
//       console.log("response from test => ", response);
//       return config;
//     })
//     .catch(error => {
//       console.error("error while backend calling ", error);
//       // Note from Erin: Added this code to handle the HTTP Response that the server sends
//       if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           console.log("Error data:", error.response.data);
//           console.log("Error status:", error.response.status);
//           console.log("Error headers:", error.response.headers);
//       } else if (error.request) {
//           // The request was made but no response was received
//           console.log("Error request:", error.request);
//       } else {
//           // Something happened in setting up the request that triggered an Error
//           console.log("Error message:", error.message);
//       }
//     });
    
// })