import axios from 'axios';
import { List, ListItem, ListItemText, Box, ListItemButton } from "@mui/material";

const MovieList = (props) => {

  async function handleListAdd(item) {
    try {
      const movieData = {
        id: 492008,
        title: '검객',
        description: 'After being blinded in a coup against the king, Joseon\'s greatest swordsman goes into hiding, far removed from his city\'s anguish. But when traffickers kidnap his daughter, he has no choice but to unsheathe his sword once more.',
        poster: '/r08U3dwiOeStXcjYmfnRyumgKyq.jpg',
        year: '2021-02-16',
        title: 'The Swordsman',
        rating: 7.5,
      };
  
      const url = 'http://localhost:8081/watchlist/save'; // Replace with the actual API endpoint
  
      const response = await axios.post(url, movieData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

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
              flexGrow: "2",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <Box component="img" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="movie poster" />
              <ListItemText 
              primary={item.original_title}
              sx={{

              }}
              />
              <ListItemText primary={item.overview}/>
              {/* <ListItemText primary={need id for services}/> */}
              <ListItemButton
              variant="cont"
              onClick={() => handleListAdd(item)}
              sx={{
                width: "10px",
                bgcolor: "gold"
              }}
              >Add</ListItemButton>
            </ListItem>
          ))}
        </List>
    )
}

export default MovieList;