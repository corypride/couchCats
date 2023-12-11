import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import FilterSearch from "./pages/FilterSearch.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/RegisterPage.jsx";
import NavBar from "./components/NavBar.jsx";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="search" element={<FilterSearch />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
