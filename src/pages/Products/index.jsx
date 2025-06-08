// src/pages/Products/index.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSelector from "../../components/ProductSelector/ProductSelector";
import "./Products.css";

const Products = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      const categoryMap = {};
      response.data.forEach((product) => {
        if (!categoryMap[product.mainCategory]) {
          categoryMap[product.mainCategory] = new Set();
        }
        categoryMap[product.mainCategory].add(product.subCategory);
      });
      const categoriesArray = Object.entries(categoryMap).map(([main, subs]) => ({
        mainCategory: main,
        subCategories: Array.from(subs),
      }));
      setCategories(categoriesArray);
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    const mainMatches = selectedMain ? product.mainCategory === selectedMain : true;
    const subMatches = selectedSub ? product.subCategory === selectedSub : true;
    return mainMatches && subMatches;
  });

  return (
    <div className="products-page">
      <h1>Products</h1>
      <ProductSelector
        categories={categories}
        selectedMain={selectedMain}
        setSelectedMain={setSelectedMain}
        selectedSub={selectedSub}
        setSelectedSub={setSelectedSub}
      />
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>
              {product.mainCategory} - {product.subCategory}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
