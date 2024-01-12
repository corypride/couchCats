import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import LandingPage from "./pages/LandingPage.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/RegisterPage.jsx";
import NavBar from "./components/NavBar.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";
import userContext from "./utils/userContext.js";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

function App() {

  const [userWatchList, setUserWatchList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: false,
    id: null,
    firstName: null,
    lastName: null,
    email: null
  });
  const [refetchDb, setRefetchDb] = useState(false);

  const navigate = useNavigate();

  const databaseCall = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  })

  const headersObj = {
  "Content-Type": "application/json",
  };
  
  // checks for user id and session id matching in database
  const sessionCheck = async (config) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/secure/${userInfo.id}`, { headers: headersObj, withCredentials: true });
      console.log("response from test => ", response);
      return config;
    } catch (error) {
      setUserInfo({
        isAuthenticated: false,
        id: null,
        firstName: null,
        lastName: null,
        email: null
    })
    navigate('/login');
    return 
    }
  }

  // sessionCheck for every database call
  databaseCall.interceptors.request.use(sessionCheck);

  // calls userWatchList from database
  const getWatchList = async (userInfo) => {
    try {
      const response = await databaseCall.get(`watchlist/${1}`);
      const data = await response.data;
      console.log(data)
      return data; // flatrate is movies on subscription streaming
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // sets userWatchList
  useEffect(() => {
    if(userInfo.isAuthenticated) {
      getWatchList(userInfo)
      .then(data => {
        setUserWatchList(data)
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [userInfo, refetchDb]);

  return (
    <div className="App">
      <userContext.Provider value={{ userWatchList, refetchDb, setRefetchDb, userInfo, setUserInfo, databaseCall, sessionCheck }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movie" element={<SingleMovie />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
