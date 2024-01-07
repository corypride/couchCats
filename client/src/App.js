import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/RegisterPage.jsx";
import NavBar from "./components/NavBar.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";
import TestLogoutButtonPage from "./pages/TestLogoutButtonPage.jsx";

function App() {
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
        <Route path="logout-test" element={<TestLogoutButtonPage />} />
      </Routes>
    </div>
  );
}

export default App;
