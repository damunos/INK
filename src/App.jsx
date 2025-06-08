// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import GroupedProductsPage from "./pages/Products/GroupedProductsPage";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import Design from "./pages/Design";
import Admin from "./pages/Admin";
import About from "./pages/About";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserProfile from "./components/UserProfile";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home user={user} />} />
        <Route
          path="products"
          element={<Products setSelectedProduct={setSelectedProduct} />}
        />
        <Route path="products/grouped" element={<GroupedProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailPage />} />
        <Route
          path="design"
          element={<Design selectedProduct={selectedProduct} />}
        />
        <Route path="admin" element={<Admin />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
