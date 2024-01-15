import React, { useContext, useState } from "react";
import { Rating } from "@mui/material";
import userContext from "../utils/userContext";

const RatingComponent = ({ movieId, userRating }) => {
  const { userInfo, databaseCall } = useContext(userContext);

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

      setLocalRating(newRating);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Rating
      name={`rating-${movieId}`}
      value={localRating}
      onChange={(event, newValue) => {
        handleRating(newValue);
      }}
    />
  );
};

export default RatingComponent;