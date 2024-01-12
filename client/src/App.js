import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/RegisterPage.jsx";
import NavBar from "./components/NavBar.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";
import TestLogoutButtonPage from "./pages/TestLogoutButtonPage.jsx";
import getWatchList from "./utils/getWatchList.js";
import userContext from "./utils/userContext.js";
import ProfilePage from "./pages/ProfilePage.jsx";

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
      <userContext.Provider value={{ userWatchList, refetchDb, setRefetchDb, userInfo, setUserInfo }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movie" element={<SingleMovie />} />
          <Route path="logout" element={<TestLogoutButtonPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
