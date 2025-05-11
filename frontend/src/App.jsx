import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./Pages/Home/Home.jsx";
import AddWorkout from "./Pages/AddWorkout/AddWorkout.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Login from "./Pages/Login/TrainTrackLogin.jsx";
import Button from "./components/Button/Button.jsx";

// Wrapper para usar useLocation fora do <BrowserRouter>
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-container">
      {!isLoginPage && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/adicionar" element={<AddWorkout />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!isLoginPage && <Button label={"text"} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
