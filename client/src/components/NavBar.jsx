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
import React, { useState } from "react";
import DrawerComp from "./DrawerComp";
import imgLogo from "../assets/img/logo-no-background.png"
import { Link } from "react-router-dom"
import PetsIcon from '@mui/icons-material/Pets';
import AutocompleteMovie from "./Autocomplete";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const PAGES = ["Home", "Search"];
  const handleChange = (_e, newValue) => {
    setValue(newValue);
  }
  return (
    <React.Fragment>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", borderBottom: "1px solid red" }}
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
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="logo"
                href="/"
              >
                <img src={imgLogo} alt="" style={{ maxWidth: 200, border: 'none' }} />
              </IconButton>

              <Tabs
                textColor="inherit"
                sx={{ marginLeft: "auto" }}
                value={value}
                onChange={handleChange}

              >
                {PAGES.map((page, index) => (
                  <Tab key={index} label={page} index={index} component={Link} to={`/${page.toLowerCase()}`} />
                ))}
              </Tabs>
              <AutocompleteMovie />
              <Button sx={{ marginLeft: 2 }}
                variant="contained"
                component={Link} 
                to="/login"
                >
                Login
              </Button>
              <Button
                sx={{ marginLeft: 2 }}
                color="secondary"
                variant="contained"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default NavBar;
