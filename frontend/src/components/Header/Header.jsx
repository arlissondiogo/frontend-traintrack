import React from "react";
import "./Header.css";
import { Home, PlusCircle, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom"; // Importe o Link

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="brand">TrainTrack</h1>
        </div>
        <nav className="nav-bar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                <Home size={25} className="nav-icon" />
                <span className="nav-text">Início</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/adicionar" className="nav-link">
                <PlusCircle size={16} className="nav-icon" />
                <span className="nav-text">Adicionar treino</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/perfil" className="nav-link">
                <User size={16} className="nav-icon" />
                <span className="nav-text">Perfil e configurações</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <LogOut size={16} className="nav-icon" />
                <span className="nav-text">Sair</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;