// src/pages/Products/index.jsx

import React, { useEffect, useState } from "react";
import { getProductData } from "../../api/promoStandardsApi";
import "./Products.css";

const Products = () => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Example product ID → you should replace with a valid ID from SanMar.
    const productID = "ST340";

    getProductData(productID)
      .then((data) => {
        console.log("Product data received:", data);
        setProductData(data);
      })
      .catch((err) => {
        console.error("Error loading product data:", err);
      });
  }, []);

  return (
    <div className="products-page">
      <h1>Products</h1>

      {productData ? (
        <pre>{JSON.stringify(productData, null, 2)}</pre>
      ) : (
        <p>Loading product data...</p>
      )}
    </div>
  );
};

export default Products;
