import React, { useContext, useEffect, useState } from "react";
import { ListItemButton } from "@mui/material";
import userContext from "../utils/userContext";

const WatchlistButton = ({ movie, handleWatchList }) => {
  const { userInfo, userWatchList } = useContext(userContext);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
      if(userInfo.id)
        if(userWatchList?.some((item)=> item.id === movie.id)) {
          setSelected(true);
      }
    }, [userWatchList, movie.id, userInfo.id])
   
      return (
        <ListItemButton
                  variant="cont"
                  onClick={() => handleWatchList(movie)}
                  selected={selected}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    bgcolor: "accent.main",
                    width: "6rem",
                    "&.Mui-selected": {
                      backgroundColor: "primary.main", // Apply custom styling when selected
                      color: "white",
                    },
                    "&:hover": {
                      backgroundColor: "accent.secondary",
                      color: "white" // Hover styles override selected background
                    },
                  }}
                  >{selected ? "Added" : "Add"}</ListItemButton>
      )
}
        
export default WatchlistButton;


