import React from 'react';
import axios from 'axios';

const LogoutComponent = () => {
    const handleLogout = async () => {
        try {
      // Send the logout request to the server
        const response = await axios.post('/user/logout', {}, {
            withCredentials: true,  // Include cookies in the request
        });

         // Assuming your server returns a success message or a specific response for logout
        console.log(response.data);
        setIsLoggedIn(false);

        // Handle any additional logic after successful logout (e.g., redirecting to the login page)
        } catch (error) {
        console.error('Error during logout:', error);
        // Handle errors (e.g., show an error message to the user)
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutComponent;
