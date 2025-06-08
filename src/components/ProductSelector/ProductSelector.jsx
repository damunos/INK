// src/components/ProductSelector/ProductSelector.jsx
import React from "react";

const ProductSelector = ({
  categories,
  selectedMain,
  setSelectedMain,
  selectedSub,
  setSelectedSub,
}) => {
  const currentSubCategories =
    categories.find((cat) => cat.mainCategory === selectedMain)?.subCategories || [];

  return (
    <div className="category-filters" style={{ marginBottom: "20px" }}>
      <select
        value={selectedMain}
        onChange={(e) => {
          setSelectedMain(e.target.value);
          setSelectedSub("");
        }}
      >
        <option value="">All Categories</option>
        {(categories || []).map((cat) => (
          <option key={cat.mainCategory} value={cat.mainCategory}>
            {cat.mainCategory}
          </option>
        ))}
      </select>

      <select
        value={selectedSub}
        onChange={(e) => setSelectedSub(e.target.value)}
        disabled={!selectedMain || currentSubCategories.length === 0}
      >
        <option value="">All Subcategories</option>
        {(currentSubCategories || []).map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelector;
