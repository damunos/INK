// src/pages/Products/index.jsx

import React, { useEffect, useState } from "react";
import { getProductData } from "../../api/promoStandardsApi";
import "./Products.css";

const ProductsPage = () => {
  const [productId, setProductId] = useState("ST640"); // Default productId for testing
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProductData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProductData(productId);
      setProductData(data);
      console.log("Fetched Product Data:", data);
    } catch (err) {
      console.error("Error fetching product data:", err);
      setError("Failed to fetch product data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]); // Refetch when productId changes

  return (
    <div className="products-page">
      <h1>Products Page</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Enter Product ID:&nbsp;
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product ID (e.g. ST640)"
          />
        </label>
        <button onClick={fetchProductData} disabled={loading}>
          {loading ? "Loading..." : "Fetch Product Data"}
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {productData ? (
        <pre style={{ textAlign: "left", backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "5px" }}>
          {JSON.stringify(productData, null, 2)}
        </pre>
      ) : (
        !loading && <div>No product data loaded yet.</div>
      )}
    </div>
  );
};

export default ProductsPage;
