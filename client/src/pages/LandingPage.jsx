import "../assets/css/LandingPage.css"
import useFetch from "../hooks/useFetch";
import '../assets/css/LandingPage.css';
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom"
const LandingPage = () => {
    //Allows button navigation
    const navigate = useNavigate();

    //discover why this is fetching 6 times per page load
    const topMoviesRequest = useFetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", process.env.REACT_APP_API_ACCESS_TOKEN);
    const topMovies = topMoviesRequest.data?.results;

    return(
        <>
            <div>
                <h2 className="title">
                    CouchCat
                </h2>
                <h2 className="tagline">
                    Spend your time watching.
                </h2>
                <Button variant="outlined" onClick={() => navigate("/search")}>Find your Movie!</Button>
            </div>
            <div className="moviesOfDay">
                <h1>Top Movies of the Day</h1>
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
                                    <ListItemText>{movie.original_title}</ListItemText>
                                    <ListItemText>{movie.release_date}</ListItemText>
                                    <ListItemText>{movie.vote_average}</ListItemText>
                                </ListItem>
                            ))}
                            </>
                            ) : (<div>Loading top movies...</div> )
                                }
                    </List>
            </div>

        </>
    )
}

export default LandingPage;