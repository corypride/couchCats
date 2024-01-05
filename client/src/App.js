import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/RegisterPage.jsx";
import NavBar from "./components/NavBar.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";
import useWatchList from "./utils/getWatchList.js";


function App() {

  // const [userWatchList, setUserWatchList] = useState();
  // const [userId, setUserId] = useState(1);

  // setUserWatchList(useWatchList(1));

  // useEffect(() => {
  //   setUserWatchList(getWatchList(userId));
  //   console.log(userWatchList)
  // }, [userId] )

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="movie" element={<SingleMovie />} />
      </Routes>
    </div>
  );
}

export default App;
