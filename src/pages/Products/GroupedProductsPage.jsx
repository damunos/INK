import React, { useEffect, useState } from "react";
import { getProductData } from "../../api/promoStandardsApi";

const GroupedProductsPage = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndGroupProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductData();
        const products = data.products || [];

        const grouped = products.reduce((acc, product) => {
          const category = product.mainCategory || "Uncategorized";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGroupProducts();
  }, []);

  return (
    <div className="grouped-products-page">
      <h1>Grouped Products</h1>
      {loading && <p>Loading grouped products...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {groupedProducts[category].map((product) => (
              <li key={product.style}>
                <h3>{product.style} - {product.styleName}</h3>
                <p>{product.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroupedProductsPage;
