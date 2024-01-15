import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import userContext from "../utils/userContext";

// after a user logins in, the headersObj in UserManagement is updated to contain the new Cookie set by the server, 
// that cookie is what the backend requires for request parameter for the logout function so this function takes in 
// that headersObj from the UserManagement component in the signature as a prop. 
const LogoutComponent = ({ headersObj }) => {
    const logoutUrl = "http://localhost:8080/user/logout";
    const navigate = useNavigate();

    const { setUserInfo } = useContext(userContext);

    const logout = () => {
        //include the withCredentials: true to ensure that the Cookie is passed with the headers if present
        axios.post(logoutUrl, {}, { headers: headersObj, withCredentials: true })
            .then((response) => {
                console.log("Response from backend => ", response);
                setUserInfo({
                    isAuthenticated: false,
                    id: null,
                    firstName: null,
                    lastName: null,
                    email: null
                });
                navigate('/login');
            })
            .catch((error) => {
                console.error("Error while backend calling ", error);

                if (error.response) {
                    //   very unlikely to happen because of everything we have in place, but as a precaution if somehow a sessionId was passed that didn't match the database, or was null
                    //   this revokes access and resets the user's data, which to the end user, doesn't look any different if it's not a malicious attack but puts silent security in place in the event it is malicious
                      setUserInfo({
                        isAuthenticated: false,
                        id: null,
                        firstName: null,
                        lastName: null,
                        email: null
                        });
                  } else {
                      // Something happened in setting up the request that triggered an Error
                      console.log("Error message:", error.message);
                  }
                });
    };

    return (
        <Button
            //calls function above on button click
            onClick={logout}
            variant="contained"
            color="primary"
        >
            Logout
        </Button>
    );
}

export default LogoutComponent;
