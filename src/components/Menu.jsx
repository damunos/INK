// src/components/Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; // optional, for styling (you can create Menu.css or omit this line)

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/products/grouped">Grouped Products</Link>
        </li>
        <li>
          <Link to="/design">Design</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
