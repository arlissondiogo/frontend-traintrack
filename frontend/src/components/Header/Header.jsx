import React, { useState } from "react";
import "./Header.css";
import { Home, PlusCircle, User, LogOut, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-container">
          <a href="/home">
            <img
              src="/logo-sem-fundo.png"
              alt="Logo"
              className="logo"
              title="Logo TrainTrack"
            />
          </a>
          <a href="/home">
            <h1 className="brand">TrainTrack</h1>
          </a>
        </div>

        <button
          className="menu-btn"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <Menu size={28} />
        </button>

        <nav className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <NavLink to="/home" className="nav-link">
                <Home size={20} />
                <span>Início</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/adicionar" className="nav-link">
                <PlusCircle size={20} />
                <span>Adicionar</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfil" className="nav-link">
                <User size={20} />
                <span>Perfil</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="nav-link">
                <LogOut size={20} />
                <span>Sair</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
