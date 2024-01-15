import axios from "axios";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import tmdb_main from "../assets/tmdb_main.svg";


const LandingPage = () => {
    //Allows button navigation
    const navigate = useNavigate();

    //for top movie requests
    const [topMovies, setTopMovies] = useState();

    //discover why this is fetching 6 times per page load


    // fetch top movies
    useEffect(() => {
        const fetchData = async () => {
            const url = "https://api.themoviedb.org/3/movie/popular";
            const params = {
            language: 'en',
            page: 1,
            };
            const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN;
            try {
              const response = await axios.get(url, { params, headers: { Authorization: `Bearer ${apiKey}` } });
              setTopMovies(response.data?.results)
            } catch (error) {
              console.error(error);
            }
          };
          fetchData();
    }, [])

    return(
        <>
            <Box>
                {/* Hero */}
                <Typography component="h2" 
                sx={{
                    fontSize: "7rem",
                    marginTop: "5rem",
                    marginBottom: "0",
                    color: "primary.main"
                }}>CouchCat</Typography>

                <Typography 
                component="h2"
                sx={{
                    fontSize: "1.5rem",
                    marginTop: "0",
                    marginBottom: "1rem",
                    color: "primary.main"
                }}
                >Less time scrolling, more time watching.</Typography>

                <Button 
                    // variant="outlined" 
                    onClick={() => navigate("/search")}
                    sx={{
                        boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)",
                        "&:hover": {
                            color: "accent.main",
                            //connect to theme accent.main
                            // border: "1px solid #ff9610"
                            }
                    }}>Find your Movie!</Button>
            </Box>
            {/* Top Movie List */}
            <Box
            sx={{
                marginTop: "15rem",
                marginBottom: "10rem"
            }}>
                <Typography component="h2" 
                sx={{
                    fontSize: "3rem",
                    marginTop: "5rem",
                    marginBottom: "0",
                    color: "accent.main"
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
                                    width: "20rem",
                                    gap: "0.25rem",
                                    color: 'primary.main'
                                }}>
                                    <Box 
                                    component="img" 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt="movie poster"
                                    sx={{
                                        width: "100%",

                                    }} />
                                    <Typography
                                    sx={{
                                        fontSize: "1rem",
                                        fontWeight: "900",
                                        textAlign: "center"
                                    }}>{movie.original_title}</Typography>
                                    <Typography>Released: {movie.release_date.slice(0,4)}</Typography>
                                    <Box
                                    sx={{
                                        display: "flex",
                                        gap: "1rem"
                                    }}>
                                        <Box 
                                        component="img" 
                                        src={tmdb_main}
                                        sx={{
                                            width: "2rem"
                                        }} />
                                        <Typography
                                        sx={{
                                            fontSize: "1.5rem"
                                        }}>{String(movie.vote_average).slice(0,3)}</Typography>
                                    </Box>
                                    {/* TODO: get streaming services? */}
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