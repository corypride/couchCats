import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button'; 

const LogoutComponent = () => {

    const logoutUrl = "http://localhost:8080/user/logout";
    const navigate = useNavigate();


    const headersObj = {
        "Content-Type": "application/json"
        }

        const logout= () => {
            axios.post(logoutUrl, { headers: headersObj, withCredentials: true })
              .then((response) => {
                console.log("Response from backend => ", response);
                navigate('/login');
                // Perform any additional actions after successful logout if/as needed
              })
              .catch((error) => {
                console.error("Error while backend calling ", error);
              });
          };
        
          return (
            <Button
              onClick={logout}
              variant="contained"
              color="primary"
            >
              Logout
            </Button>
          );
        }
        
        export default LogoutComponent;