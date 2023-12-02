import { Button } from "@mui/material";
import "../assets/css/LandingPage.css";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";

const LandingPage = () => {

    //discover why this is fetching 6 times per page load
    const moviesOfDay = useFetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", process.env.REACT_APP_API_ACCESS_TOKEN);
    console.log(moviesOfDay);

    return(
        <>
            <NavBar />
            <div className="hero">
                <h2 className="title">
                    CouchCat
                </h2>
                <h2 className="tagline">
                    Spend your time watching.
                </h2>
                <Button variant="outlined">Find your Movie!</Button>
            </div>
            <div className="moviesOfDay">

            </div>
        </>
    )
}

export default LandingPage;