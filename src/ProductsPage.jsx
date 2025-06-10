// src/pages/Products/index.jsx

import React, { useEffect, useState } from "react";
import { getProductData } from "../../api/promoStandardsApi";

const ProductsPage = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductData("ST350"); // Example product ID
        setProductData(data);
      } catch (err) {
        setError("Failed to fetch product data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products Page</h1>

      {loading && <p>Loading product data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {productData ? (
        <div>
          <h2>Product Response Object:</h2>
          <pre style={{ background: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(productData, null, 2)}
          </pre>

          {/* Example display fields */}
          <h3>Example Fields:</h3>
          <p>
            <strong>Product Name:</strong>{" "}
            {productData?.ProductName || "N/A"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {productData?.ProductDescription || "N/A"}
          </p>
          {/* Add more fields as needed */}
        </div>
      ) : null}
    </div>
  );
};

export default ProductsPage;
// src/pages/Products/index.jsx