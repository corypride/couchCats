import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {

    return(
        props.userInfo.isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoutes;