// src/pages/Design/index.jsx
import React from "react";
import "./Design.css";

const Design = ({ selectedProduct }) => {
  return (
    <div className="design-page">
      <h1>Design Tool</h1>
      {selectedProduct ? (
        <div className="product-preview">
          <h2>{selectedProduct.name}</h2>
          <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
          {/* You would insert your design tool components here */}
        </div>
      ) : (
        <p>Please select a product first to start designing.</p>
      )}
    </div>
  );
};

export default Design;
