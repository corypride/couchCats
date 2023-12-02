import { Button } from "@mui/material";
import "../assets/css/LandingPage.css";
import NavBar from "../components/NavBar";

const LandingPage = () => {

    return(
        <>
            <NavBar />
            <div className="title">
                CouchCat
            </div>
            <Button variant="outlined">Find your Movie!</Button>
        </>
    )
}

export default LandingPage;