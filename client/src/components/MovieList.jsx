import axios from 'axios';
import { List, ListItem, ListItemText, Box, ListItemButton } from "@mui/material";
import getServices from "../utils/getServices"
import { useEffect, useState } from 'react';

const MovieList = (props) => {

  const [services, setServices] = useState();

  async function handleListAdd(item) {
    try {

      const url = 'http://localhost:8081/watchlist/save'; // Replace with the actual API endpoint

      const movieData = {
        id: 492008,
        title: '검객',
        description: 'After being blinded in a coup against the king, Joseon\'s greatest swordsman goes into hiding, far removed from his city\'s anguish. But when traffickers kidnap his daughter, he has no choice but to unsheathe his sword once more.',
        poster: '/r08U3dwiOeStXcjYmfnRyumgKyq.jpg',
        year: '2021-02-16',
        title: 'The Swordsman',
        rating: 7.5,
      };
  
      const response = await axios.post(url, movieData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const test = getServices(976573)
  console.log(test)

  // Array to get services?

  // useEffect(() => {
  //   const serviceArray = [];
  //   const movieServiceList = () => {
  //     props.queriedMovies.map((movie) => {
  //       const list = getServices(movie.id);
  //       serviceArray.push(list);
  //       console.log(serviceArray)
  //     })
  //   }
  //   movieServiceList();
  // }, [props.queriedMovies])

  return (
      <List
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1.5rem"
      }}
      >
        {props.queriedMovies.slice(0,3).map((item, index) => (
          <ListItem
          key={item.original_title}
          sx={{
            display: "flex",

          }}>
            <Box>
              <Box component="img" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="movie poster" />
              <ListItemButton
                variant="cont"
                onClick={() => handleListAdd(item)}
                sx={{
                  flexGrow: "0",
                  bgcolor: "accent.main"
                }}
                >Add</ListItemButton>
            </Box>
            <Box>
              <ListItemText 
                primary={item.original_title}
                sx={{
                  "& .MuiTypography-root" : {
                    fontSize: "2rem"
                  }
                }}
                />
                <ListItemText primary={item.overview}/>

                {/* {getServices(item.id) ? "Loading..." : getServices(item.id).map((service) => (
                  <ListItem>{service.provider_id}</ListItem>
                ))} */}
            </Box>
          </ListItem>
        ))}
      </List>
    )
}

export default MovieList;