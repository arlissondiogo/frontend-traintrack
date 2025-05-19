import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./Pages/Home/Home.jsx";
import AddWorkout from "./Pages/AddWorkout/AddWorkout.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Login from "./Pages/Login/TrainTrackLogin.jsx";
import Button from "./components/Button/Button.jsx";
import SingUp from "./Pages/SingUp/TrainTrackSingup.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";

function AppContent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/cadastro" ||
    location.pathname === "/recuperar-senha";

  return (
    <div className="app-container">
      {!isAuthPage && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/adicionar" element={<AddWorkout />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SingUp />} />
          <Route path="/recuperar-senha" element={<ForgotPassword />} />
        </Routes>
      </main>
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