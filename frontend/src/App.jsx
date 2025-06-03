import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./Pages/Home/Home.jsx";
import AddWorkout from "./Pages/AddWorkout/AddWorkout.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Login from "./Pages/Login/TrainTrackLogin.jsx";
import SingUp from "./Pages/SingUp/TrainTrackSingup.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import UpdateUser from "./Pages/UpdateProfile/UpdateProfile.jsx";
import ResetPassword from "./Pages/ResetPassword/ResetPassword.jsx";
import History from "./Pages/UpdateProfile/History.jsx";

function AppContent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/cadastro" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/recuperar-senha";

  return (
    <div className="app-container">
      {!isAuthPage && <Header />}
      <main className="main-content">
        <Routes>
          {/* Redirecionamento da raiz para login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Demais rotas */}
          <Route path="/home" element={<Home />} />
          <Route path="/adicionar" element={<AddWorkout />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SingUp />} />
          <Route path="/recuperar-senha" element={<ForgotPassword />} />
          <Route path="/editar-user" element={<UpdateUser />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/historico" element={<History />} />
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
