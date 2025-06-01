import React, { useState } from "react";
import "./Header.css";
import { Home, PlusCircle, User, LogOut, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-container">
          <a href="../pages/home">
            <img src="/logo-sem-fundo.png" alt="Logo" className="logo" title="Logo TrainTrack" />
          </a>
          <a href="../pages/home">
            <h1 className="brand">TrainTrack</h1>
          </a>
        </div>
        <button className="menu-btn" onClick={toggleMenu} aria-label="Abrir menu">
          <Menu size={30} />
        </button>
        <nav className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link" aria-label="Início">
                <Home size={20} className="nav-icon" />
                <span className="nav-text">Início</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/adicionar" className="nav-link" aria-label="Adicionar treino">
                <PlusCircle size={20} className="nav-icon" />
                <span className="nav-text">Adicionar treino</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/perfil" className="nav-link" aria-label="Perfil e configurações">
                <User size={20} className="nav-icon" />
                <span className="nav-text">Perfil</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" aria-label="Sair">
                <LogOut size={20} className="nav-icon" />
                <span className="nav-text">Sair</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
