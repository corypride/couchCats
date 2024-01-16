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
  const [userMovieLog, setUserMovieLog] = useState([]);
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
      const response = await databaseCall.get(`watchlist/${userInfo.id}`); //FROM ERIN: fixed a hard-coded user id here
      const data = await response.data;
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
        console.log(data)
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [userInfo, refetchDb]);

  // calls userMovieLog from database
  const getUserMovieLog = async (userInfo) => {
    try {
      const response = await databaseCall.get(`log/${userInfo.id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  // sets userMovieLog
  useEffect(() => {
    if(userInfo.isAuthenticated) {
      getUserMovieLog(userInfo)
      .then(data => {
        setUserMovieLog(data)
        console.log(data)
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [userInfo, refetchDb]);

  return (
    <div className="App">
      <userContext.Provider value={{ userWatchList, userMovieLog, refetchDb, setRefetchDb, userInfo, setUserInfo, databaseCall, sessionCheck }}>
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
