import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/RegisterPage.jsx";
import NavBar from "./components/NavBar.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";
import getWatchList from "./utils/getWatchList.js";
import userContext from "./utils/userContext.js"

function App() {

  const [userWatchList, setUserWatchList] = useState([]);
  const [userId, setUserId] = useState(1);

  // const list = useWatchList(userId)
  // setUserWatchList(list)
  // console.log(list)

  useEffect(() => {
    getWatchList(userId)
    .then(data => {
      setUserWatchList(data)
    })
    .catch(error => {
      console.error(error);
    });
  }, [userId]);

  return (
    <div className="App">
      <userContext.Provider value={{ userWatchList, userId }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="search" userWatchList={userWatchList} element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movie" element={<SingleMovie />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
