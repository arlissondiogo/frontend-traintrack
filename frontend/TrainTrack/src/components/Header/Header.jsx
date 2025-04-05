// src/components/Header.jsx
import "./Header.css";
import { Home, PlusCircle, User, LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="brand">TrainTrack</h1>
      </div>
      <nav className="nav-bar">
        <NavItem icon={<Home size={18} />} text="Início" />
        <NavItem icon={<PlusCircle size={18} />} text="Adicionar treino" />
        <NavItem icon={<User size={18} />} text="Perfil e configurações" />
        <NavItem icon={<LogOut size={18} />} text="Sair" />
      </nav>
    </header>
  );
}

function NavItem({ icon, text, active }) {
  return (
    <button className={`nav-item ${active ? "active" : ""}`}>
      {icon}
      {text}
    </button>
  );
}
