import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import FilterSearch from "./pages/FilterSearch.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="filtersearch" element={<FilterSearch />}/>
      </Routes>
    </div>
  )
}

export default App;
