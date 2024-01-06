import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import MovieDisplay from "../components/MovieDisplay";


const SingleMovie = (props) => {

    const { state } = useLocation();
    const movieData = state.value;

    return(
        <Box
        sx={{
            display: "flex",
            justifyContent: "center"
        }}>
            <MovieDisplay
            movie={movieData}
            />
        </Box>
    )
}

export default SingleMovie;