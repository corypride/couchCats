import { useEffect, useState, useContext } from 'react';
import userContext from "../utils/userContext";

const MovieLogComponent = (props) => {
  // const [userMovieLog, setUserMovieLog] = useState(null);
  const { userInfo, userMovieLog } = useContext(userContext);

  // useEffect(() => {
  //   // Fetch user details when the component mounts
  //   const fetchData = async () => {
  //     try {
  //       // TODO: get this to work with actual userId
  //       // let userid = 2;
  //       let movieLog = await getMovieLog(2);

  //       // Update the state with the user details
  //       setUserMovieLog(movieLog);

  //       console.log("userMovieLog: ", movieLog);
  //     } catch (error) {
  //       console.error("Error fetching movie log:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

//   return <div>User details: {userMovieLog.dateAdded}</div>;
        return <div>Movie log: {userMovieLog}</div>
};

export default MovieLogComponent;


// import React, { useState, useEffect } from "react";
// import getMovieLog from "../utils/getMovieLog";

// const MovieLogComponent = (props) => {
//   const [userMovieLog, setUserMovieLog] = useState(null);

// //   useEffect(() => {
// //     // Fetch user details when the component mounts
// //     getUserInfoBySessionId();
// //   }, []);

//   async function getMovieLogByUserId() {
//     let userid = 253;
//     let movieLog = await getMovieLog(userid);
    
//     // Update the state with the user details
//     setUserMovieLog(movieLog);
//   }

//   let movieLog = getMovieLogByUserId();
//   console.log("movieLog: " + movieLog);

//   return <div>User details: {movieLog[0]}</div>;
// };

// export default MovieLogComponent;