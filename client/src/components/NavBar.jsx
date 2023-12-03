import "../assets/css/NavBar.css";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const NavBar = () => {

    const numbers = ["1", "2", "3"]

    return(
        <div className="navBar">
            <div className="logo">
                Cc
            </div>
            <div className="searchBar">
                <Autocomplete
                    id="free-solo-demo"
                    size="medium"
                    freeSolo
                    options={numbers.map((option) => option)}
                    renderInput={(params) => <TextField {...params} label="Search Movies" />}
                    />
            </div>
        </div>
    )
}

export default NavBar;