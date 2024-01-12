import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useContext } from "react";
import DrawerComp from "./DrawerComp";
import imgLogo from "../assets/img/logo-no-background.png"
import { Link } from "react-router-dom"
import PetsIcon from '@mui/icons-material/Pets';
import Autocomplete from "./Autocomplete";
import userContext from "../utils/userContext.js";
import LogoutComponent from "./LogoutComponent.jsx";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const PAGES = ["Home", "Search"];
  const pagesAuth = ["Home", "Search", "Profile"]
  const handleChange = (_e, newValue) => {
    setValue(newValue);
  }

  const { userInfo } = useContext(userContext)

// //ERIN ADDED CODE
//   const Navigation = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = () => {
//       // Perform login logic, set isLoggedIn to true
//       setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//       // Perform logout logic, set isLoggedIn to false
//       setIsLoggedIn(false);
//     };
        
//       };

//     //end of ERIN ADDED CODE

  return (
    <React.Fragment>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent" }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <PetsIcon color="primary" sx={{marginRight:1, paddingBottom:1}}/>
              <Typography color="primary">Couch Cats</Typography>
              <DrawerComp />
            </>
          ) : (
            <>
            <Link to="/">
              <IconButton
                  size="large"
                  edge="start"
                  color="primary"
                  aria-label="logo"
                >
                  <img src={imgLogo} alt="" style={{ maxWidth: 200, border: 'none' }} />
                </IconButton>
            </Link>

              <Tabs
                textColor="inherit"
                sx={{ 
                  marginLeft: "auto",
                  marginRight: 2
                 }}
                value={value}
                onChange={handleChange}
              >

                {userInfo.isAuthenticated ?
                  pagesAuth.map((page, index) => (
                    <Tab key={index} label={page} index={index} component={Link} to={`/${page.toLowerCase()}`} />
                  ))
                :
                  PAGES.map((page, index) => (
                    <Tab key={index} label={page} index={index} component={Link} to={`/${page.toLowerCase()}`} />
                  ))
                }

              </Tabs>
              <Autocomplete />
              {userInfo.isAuthenticated ?
                <Typography
                  sx={{
                    marginLeft: 2,
                    marginRight: 2,
                    color: "accent.main"
                  }}>
                  {`Welcome, ${userInfo.firstName}!`}
                </Typography>
                :              
                <Button
                  sx={{ marginLeft: 2 }}
                  color="secondary"
                  variant="contained"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              }
              {userInfo.isAuthenticated ?
                <LogoutComponent />
                :
                <Button sx={{ marginLeft: 2 }}
                  variant="contained"
                  component={Link} 
                  to="/login"
                  >
                  Login
                </Button>
              }

            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default NavBar;
