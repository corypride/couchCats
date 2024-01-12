import { Outlet, Navigate } from 'react-router-dom'
import userContext from "../utils/userContext";
import { useContext } from 'react';

const ProtectedRoutes = () => {

    const { userInfo, sessionCheck } = useContext(userContext)
    sessionCheck();
    
    return(
        userInfo.isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoutes;