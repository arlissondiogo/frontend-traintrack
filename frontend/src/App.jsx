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
import History from "./Pages/UpdateProfile/History.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

function AppContent() {
  const location = useLocation();

  const knownRoutes = [
    "/home",
    "/adicionar",
    "/perfil",
    "/editar-user",
    "/historico",
  ];

  const authRoutes = ["/login", "/cadastro", "/recuperar-senha"];

  const shouldHideHeader =
    authRoutes.includes(location.pathname) ||
    ![...authRoutes, ...knownRoutes].includes(location.pathname);

  return (
    <div className="app-container">
      {!shouldHideHeader && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/adicionar" element={<AddWorkout />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SingUp />} />
          <Route path="/recuperar-senha" element={<ForgotPassword />} />
          <Route path="/editar-user" element={<UpdateUser />} />
          <Route path="/historico" element={<History />} />
          <Route path="*" element={<NotFound />} />
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
