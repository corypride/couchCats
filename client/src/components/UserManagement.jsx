import React from 'react';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';

//Acts as a parent component to manage the user, right now set up with just Login and Logoout components
const UserManagement = () => {
    //sets the headersObj that is passed to both Login and Logout functions
    const headersObj = {
        "Content-Type": "application/json",
    };

    return (
        <div>
            {/* Render LoginComponent and LogoutComponent with headersObj so that both use the same header object/values */}
            <LoginComponent headersObj={headersObj} />
            <LogoutComponent headersObj={headersObj} />
        </div>
    );
}

export default UserManagement;
