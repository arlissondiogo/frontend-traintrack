import React from "react";
import { Link } from "react-router-dom";
import "./NavItem.css";

const NavItem = ({ icon, text, to }) => {
  return (
    <Link to={to} className="nav-item">
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default NavItem;
