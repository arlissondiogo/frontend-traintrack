import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home.jsx";
import AddWorkout from "./Pages/AddWorkout/AddWorkout.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Login from "./Pages/Login/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/adicionar" element={<AddWorkout />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
