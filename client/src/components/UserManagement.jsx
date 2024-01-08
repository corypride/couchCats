import React from 'react';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';

const UserManagement = () => {
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
