// src/api/promoStandardsApi.js

import soap from "soap";

// POService (already provided):
const PO_WSDL_URL = "https://test-ws.sanmar.com:8080/promostandards/POServiceBinding?WSDL";

// ProductDataService (you will need to confirm URL with SanMar):
const PRODUCT_DATA_WSDL_URL = "https://test-ws.sanmar.com:8080/promostandards/ProductDataServiceBinding?WSDL";

// Your SanMar credentials (not FTP)
const USERNAME = "melaniesue9972";
const PASSWORD = "Alan1963!";

/**
 * Generic helper to create SOAP client with BasicAuth.
 */
const createSoapClient = async (wsdlUrl) => {
  return new Promise((resolve, reject) => {
    soap.createClient(wsdlUrl, (err, client) => {
      if (err) {
        return reject(err);
      }

      client.setSecurity(new soap.BasicAuthSecurity(USERNAME, PASSWORD));
      resolve(client);
    });
  });
};

/**
 * Example function to call GetSupportedOrderTypes (POService).
 */
export const getSupportedOrderTypes = async () => {
  try {
    const client = await createSoapClient(PO_WSDL_URL);
    const args = {};

    return new Promise((resolve, reject) => {
      client.GetSupportedOrderTypes(args, (err, result) => {
        if (err) {
          console.error("SOAP Error (GetSupportedOrderTypes):", err);
          return reject(err);
        }

        console.log("SOAP Response (GetSupportedOrderTypes):", result);
        resolve(result);
      });
    });
  } catch (err) {
    console.error("Error creating SOAP client (POService):", err);
    throw err;
  }
};

/**
 * Example function to call GetProductData (ProductDataService).
 */
export const getProductData = async (productID) => {
  try {
    const client = await createSoapClient(PRODUCT_DATA_WSDL_URL);

    const args = {
      productID: productID, // Example product ID: "ST340"
      localizationCountry: "US",
      localizationLanguage: "en",
    };

    return new Promise((resolve, reject) => {
      client.GetProductData(args, (err, result) => {
        if (err) {
          console.error("SOAP Error (GetProductData):", err);
          return reject(err);
        }

        console.log("SOAP Response (GetProductData):", result);
        resolve(result);
      });
    });
  } catch (err) {
    console.error("Error creating SOAP client (ProductDataService):", err);
    throw err;
  }
};
