import "../assets/css/LandingPage.css"
import useFetch from "../hooks/useFetch";
import '../assets/css/LandingPage.css';
import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
const LandingPage = () => {
    //Allows button navigation
    const navigate = useNavigate();

    //discover why this is fetching 6 times per page load
    const topMoviesRequest = useFetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", process.env.REACT_APP_API_ACCESS_TOKEN);
    const topMovies = topMoviesRequest.data?.results;

    return(
        <>
            <Box>
                <Typography component="h2" 
                sx={{
                    fontSize: "7rem",
                    marginTop: "5rem",
                    marginBottom: "0",
                }}>CouchCat</Typography>

                <Typography 
                component="h2"
                sx={{
                    fontSize: "1.5rem",
                    marginTop: "0",
                    marginBottom: "1rem"
                }}
                >Spend your time watching.</Typography>

                <Button 
                variant="outlined" 
                onClick={() => navigate("/search")}
                sx={{
                    hover: ""
                }}>Find your Movie!</Button>
            </Box>

            <Box
            sx={{
                marginTop: "10rem",
                marginBottom: "10rem"
            }}>
                <Typography component="h2" 
                sx={{
                    fontSize: "3rem",
                    marginTop: "5rem",
                    marginBottom: "0"
                }}>Top Movies</Typography>
                    <List 
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        {topMovies && topMovies.length > 0 ? (
                            <>
                            {topMovies.slice(0, 3).map((movie) => (
                                <ListItem 
                                key={movie.id} 
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    fontSize: "0.5rem",
                                    width: "300px"
                                }}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster" />
                                    <ListItemText
                                    sx={{
                                        fontSize: "3rem",
                                        fontWeight: "900"
                                    }}>{movie.original_title}</ListItemText>
                                    <ListItemText>Released: {movie.release_date.slice(0,4)}</ListItemText>
                                    <ListItemText>{movie.vote_average}</ListItemText>
                                    {/* get streaming services */}
                                </ListItem>
                            ))}
                            </>
                            ) : (<div>Loading top movies...</div> )
                                }
                    </List>
            </Box>
        </>
    )
}

export default LandingPage;