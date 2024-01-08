import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button';

// after a user logins in, the headersObj in UserManagement is updated to contain the new Cookie set by the server, 
// that cookie is what the backend requires for request parameter for the logout function so this function takes in 
// that headersObj from the UserManagement component in the signature as a prop. 
const LogoutComponent = ({ headersObj }) => {
    const logoutUrl = "http://localhost:8080/user/logout";
    const navigate = useNavigate();

    const logout = () => {
        //include the withCredentials: true to ensure that the Cookie is passed with the headers if present
        axios.post(logoutUrl, {}, { headers: headersObj, withCredentials: true })
            .then((response) => {
                console.log("Response from backend => ", response);
                navigate('/login');
                // Perform any additional actions after successful logout if/as needed 
                //-- not sure if we'll need to add anything else here (i.e. if there is boolean or something Yumi establishes) so leaving a comment for us to revisit
            })
            .catch((error) => {
                console.error("Error while backend calling ", error);
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
