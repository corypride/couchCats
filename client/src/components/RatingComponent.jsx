import React, { useContext, useState } from "react";
import { Rating } from "@mui/material";
import userContext from "../utils/userContext";

const RatingComponent = ({ movieId, userRating }) => {
  const { userInfo, databaseCall } = useContext(userContext);

  // TODO: is this going to save the same rating for every movie?
  const [localRating, setLocalRating] = useState(userRating);

  async function handleRating(newRating) {
    const newRatingPOST = {
      userMovieLogId: {
        userId: userInfo.id,
        movieId: movieId,
      },
      newRating: newRating,
    };

    try {
      const response = await databaseCall.post('/log/rate', newRatingPOST);
      console.log('Response:', response.data);

      // TODO: same q as above
      setLocalRating(newRating);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Rating
      name={`rating-${movieId}`}
      value={localRating} // TODO: check this
      onChange={(event, newValue) => {
        handleRating(newValue);
      }}
    />
  );
};

export default RatingComponent;



// import React, { useContext, useEffect, useState } from "react";
// import { ListItemButton, Rating } from "@mui/material";
// import userContext from "../utils/userContext";

// const RatingComponent = ({ movieId, userRating }) => {
//     // const [selected, setSelected] = useState(false);
  
//     const { userInfo, databaseCall } = useContext(userContext)
  
//     async function handleRating() {

//         const newRatingPOST = {
//             userMovieLogId: {
//                 userId: userInfo.id,
//                 movieId: movieId
//                 },
//                 newRating: newRating
//             }
  
//     //   const dataDelete = {
//     //     userId: userInfo.id,
//     //     movieId: movie.id
//     //   }
  
        
//         async function setNewRating(newRating) {
//             try {
//                 const response = await databaseCall.post('/log/rate', newRatingPOST);
//                 console.log('Response:', response.data);
//               } catch (error) {
//                 if (error.response) {
//                   console.log("Error data:", error.response.data);
//                   console.log("Error status:", error.response.status);
//                   console.log("Error headers:", error.response.headers);
            
//                   // TODO: appropriate error message
//                   alert("Error: " + error.response.data);
//                 }
//                 console.error('Error:', error);
//               }

//         }
     
//         return (
//             <Rating
//                 name="simple-controlled"
//                 value={userRating}
//                 onChange={(event, newValue) => {
//                     setNewRating(newValue);
//                 }}
//             />
//         )
//   }
// }
          
//   export default RatingComponent;