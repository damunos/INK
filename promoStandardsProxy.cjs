// promoStandardsProxy.cjs
const express = require("express");
const bodyParser = require("body-parser");
const soap = require("soap");
const cors = require("cors");

const app = express();
const PORT = 4000;

// SanMar production endpoint:
const SANMAR_WSDL_PROD = "https://ws.sanmar.com/ProductDataService.svc?singleWsdl";
// Optional: override with sandbox endpoint using env var
const WSDL_URL = process.env.SANMAR_SOAP_URL || SANMAR_WSDL_PROD;

const SANMAR_USERNAME = "melaniesue9972";
const SANMAR_PASSWORD = "Alan1963!";

app.use(cors());
app.use(bodyParser.json());

let soapClient = null;

// Create SOAP client once at startup
soap.createClient(WSDL_URL, { forceSoap12Headers: true }, (err, client) => {
  if (err) {
    console.error("❌ Failed to create SOAP client:", err.message);
    return;
  }
  soapClient = client;
  console.log("✅ SOAP client created successfully");

  // Print available SOAP methods
  console.log("Available SOAP methods:", Object.keys(client.describe().ProductDataService.ProductDataService));
});

app.post("/api/productData", async (req, res) => {
  const productId = req.body.productId;
  console.log(`Incoming request to /api/productData with productId: ${productId}`);

  if (!productId) {
    console.log("Missing productId in request body");
    return res.status(400).json({ error: "Missing productId" });
  }

  if (!soapClient) {
    console.error("SOAP client not initialized");
    return res.status(500).json({ error: "SOAP client not initialized" });
  }

  // SOAP request parameters
  const soapArgs = {
    ProductDataRequest: {
      ProductID: productId,
      Username: SANMAR_USERNAME,
      Password: SANMAR_PASSWORD,
    },
  };

  try {
    soapClient.GetProduct(soapArgs, (err, result, rawResponse, soapHeader, rawRequest) => {
      if (err) {
        console.error("Error calling SOAP API:", err.message);
        return res.status(500).json({ error: err.message });
      }

      console.log("SOAP call successful — returning raw XML");
      res.set("Content-Type", "application/xml");
      res.send(rawResponse);
    });
  } catch (error) {
    console.error("Exception during SOAP API call:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ PromoStandards Proxy running at http://localhost:${PORT}`);
  console.log(`Using WSDL URL: ${WSDL_URL}`);
});
