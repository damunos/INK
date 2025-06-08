import React, { useEffect, useState } from "react";
import { getProductData } from "../../api/promoStandardsApi";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { style } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductData();
        const products = data.products || [];
        const foundProduct = products.find((p) => p.style === style);

        setProduct(foundProduct || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [style]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-page">
      <h1>{product.style} - {product.styleName}</h1>
      <p>{product.description}</p>
      <p>Category: {product.mainCategory}</p>
      <p>Subcategory: {product.subCategory}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductDetailPage;
