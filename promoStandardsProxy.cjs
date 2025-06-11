// promoStandardsProxy.cjs
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Important — workaround for some Render environments
let soap;
try {
  soap = require("soap");
} catch (err) {
  console.error("❌ Failed to require 'soap' module:", err.message);
  process.exit(1); // Exit with error so deploy fails clearly
}

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// SanMar SOAP WSDL endpoint
const WSDL_URL = "https://ws.sanmar.com/ProductDataService.svc?singleWsdl";

app.post("/api/productData", async (req, res) => {
  const { productId } = req.body;
  console.log("Incoming request to /api/productData with productId:", productId);

  if (!productId) {
    res.status(400).json({ error: "Missing productId in request body" });
    return;
  }

  try {
    console.log("Using WSDL URL:", WSDL_URL);

    const client = await soap.createClientAsync(WSDL_URL);
    client.setSecurity(
      new soap.BasicAuthSecurity(
        "melaniesue9972", // Replace with your SanMar username
        "Alan1963!"       // Replace with your SanMar password
      )
    );

    const args = {
      ProductId: productId,
      LocalizationCountry: "US",
      LocalizationLanguage: "en",
    };

    console.log("Calling GetProduct with args:", args);

    const [result, rawResponse] = await client.GetProductAsync(args);

    console.log("SOAP response received for productId:", productId);

    res.send(rawResponse); // send raw SOAP XML to frontend for now
  } catch (err) {
    console.error("Error calling SOAP API:", err.message);
    res.status(500).json({ error: "Error calling SOAP API", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ PromoStandards Proxy running at http://localhost:${PORT}`);
});
