import React, { useState, useContext } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import userContext from "../utils/userContext.js";

const DrawerComp = ({headersObj}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const PAGES = ["Home", "Search", "Profile", "Login", "Register"];
  const authPAGES = ["Home", "Search", "Profile"];
  const { userInfo, setUserInfo } = useContext(userContext);
  const navigate = useNavigate();


  const handleClickLogOut = () => {
    const logoutUrl = "http://localhost:8080/user/logout";

    axios.post(logoutUrl, {}, { headers: headersObj, withCredentials: true })
            .then((response) => {
                console.log("Response from backend => ", response);
          //sessionStorage.removeItem('user');
                sessionStorage.removeItem("")
                setUserInfo({
                    isAuthenticated: false,
                    id: null,
                    firstName: null,
                    lastName: null,
                    email: null
                });
                navigate('/login');
                // Perform any additional actions after successful logout if/as needed 
                //-- not sure if we'll need to add anything else here (i.e. if there is boolean or something Yumi establishes) so leaving a comment for us to revisit
            })
            .catch((error) => {
                console.error("Error while backend calling ", error);
            });
  }

  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        {userInfo.isAuthenticated ? (
          <>
            <List>
              {authPAGES.map((page, index) => (
                <ListItemButton key={index} component={Link} to={`/${page.toLowerCase()}`}>
                  <ListItemIcon>
                    <ListItemText>{page}</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))}

              <ListItemButton onClick={handleClickLogOut}>
                <ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>

            </List>
          </>
        ) : (
          <>
            <List>
              {PAGES.map((page, index) => (
                <ListItemButton key={index} component={Link} to={`/${page.toLowerCase()}`}>
                  <ListItemIcon>
                    <ListItemText>{page}</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))}
            </List>
          </>
        )
        }

      </Drawer>
      <IconButton
        color="primary"
        sx={{ marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment >
  );
};

export default DrawerComp;
