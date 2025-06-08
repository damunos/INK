import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // optional for styling, can skip if you want no styles

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/products/grouped">Grouped Products</Link></li>
        <li><Link to="/design">Design</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
