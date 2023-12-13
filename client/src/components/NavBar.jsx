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
import Autocomplete from "./Autocomplete";

const NavBar = () => {
  const [value, setvalue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const PAGES = ["Home", "Search"];
  return (
    <React.Fragment>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", borderBottom: "1px solid red" }}
      >
        <Toolbar>
          {isMatch ? (
            <>
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
                <img src={imgLogo} alt="" style={{maxWidth: 200, border: 'none'}}/>
              </IconButton>

              <Tabs
                textColor="inherit"
                sx={{ marginLeft: "auto" }}
                value={value}
                onChange={(e, value) => -setvalue(value)}
                indicatorColor="none"
              >
                {PAGES.map((page, index) => (
                  <Tab key={index} label={page} href={`/${page.toLowerCase()}`} />
                ))}
              </Tabs>
              <Autocomplete />
              <Button sx={{ marginLeft: 2 }} variant="contained" href="/login">
                Login
              </Button>
              <Button
                sx={{ marginLeft: 2 }}
                color="secondary"
                variant="contained"
                href="/register"
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
