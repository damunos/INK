// src/api/promoStandardsApi.js

import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const API_BASE_URL = "http://localhost:4000";

export const getProductData = async (productId) => {
  if (!productId) {
    console.warn("getProductData called with undefined or empty productId — skipping call.");
    return null;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/productData`, {
      productId,
    });

    const rawXml = response.data;
    console.log("Raw SOAP XML:", rawXml);

    // Parse XML to JS object
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });
    const parsed = parser.parse(rawXml);
    console.log("Parsed SOAP response:", parsed);

    // Navigate through SOAP envelope to find product data
    const productResponse =
      parsed["soap:Envelope"]?.["soap:Body"]?.GetProductResponse;

    return productResponse || {};
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
