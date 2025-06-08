// src/components/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/design">Design Tool</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Ink N Threadworks
      </footer>
    </div>
  );
};

export default Layout;
