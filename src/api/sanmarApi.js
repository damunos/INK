import axios from "axios";
import { SANMAR_API } from "../config/sanmarConfig";

const sanmarApi = axios.create({
  baseURL: "https://test-ws.sanmar.com:8080/promostandards/POServiceBinding?WSDL";
  auth: {
    username: "melaniesue9972",
    password: "Alan1963!",
  },
});

export const fetchSanMarProducts = async () => {
  try {
    const response = await sanmarApi.get("/products"); // Update with actual endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching SanMar products:", error);
    return [];
  }
};

export default sanmarApi;
