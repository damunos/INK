// src/api/promoStandardsApi.js
import axios from 'axios';

const PROXY_BASE_URL = 'http://localhost:4000/api';

export async function getProductData(productId) {
  try {
    const response = await axios.get(`${PROXY_BASE_URL}/productData`, {
      params: { productId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
}

export async function submitPO(poData) {
  try {
    const response = await axios.post(`${PROXY_BASE_URL}/submitPO`, poData);
    return response.data;
  } catch (error) {
    console.error('Error submitting PO:', error);
    throw error;
  }
}
