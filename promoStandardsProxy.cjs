// promoStandardsProxy.cjs
const express = require('express');
const axios = require('axios');
const soap = require('soap');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// PromoStandards API credentials (UPDATED)
const SANMAR_USERNAME = "melaniesue9972";
const SANMAR_PASSWORD = "Alan1963!";

// Replace this with your correct WSDL URL
const WSDL_URL = "https://api.sanmar.com/PromoStandards/ProductDataService/1.0.0/ProductDataService.svc?wsdl";

// Example SOAP request params (will need more detailed params from the full API guide)
const requestParams = {
  wsdl_options: {
    username: SANMAR_USERNAME,
    password: SANMAR_PASSWORD
  }
};

// Example SOAP call handler
app.get('/api/productData', async (req, res) => {
  try {
    console.log("Connecting to SOAP client...");
    const client = await soap.createClientAsync(WSDL_URL, requestParams);

    // Add basic auth to SOAP client
    client.setSecurity(new soap.BasicAuthSecurity(SANMAR_USERNAME, SANMAR_PASSWORD));

    // Example "GetProductDataRequest" parameters (you should customize based on your API guide)
    const args = {
      wsVersion: '1.0.0',
      requesterID: { ID: SANMAR_USERNAME },
      vendorID: { ID: 'SanMar' },
      productID: '',  // empty for all products, or set specific product ID
      localizationCountry: 'US',
      localizationLanguage: 'en'
    };

    console.log("Calling GetProductData...");
    const [result] = await client.GetProductDataAsync(args);

    console.log("SOAP result received.");
    res.json(result);
  } catch (error) {
    console.error("Error fetching product data:", error.message);
    res.status(500).json({ error: "Error fetching product data", details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`PromoStandards Proxy running at http://localhost:${PORT}`);
});
