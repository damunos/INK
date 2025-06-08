// src/pages/Products/ProductDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Viewing details for product ID: {productId}</p>
    </div>
  );
};

export default ProductDetailPage;
