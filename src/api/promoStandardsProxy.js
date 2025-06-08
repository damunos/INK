// promoStandardsProxy.js
const express = require('express');
const cors = require('cors');
const soap = require('soap');
const bodyParser = require('body-parser');

const app = express();
const port = 4000; // You can change this if needed

app.use(cors());
app.use(bodyParser.json());

// === CONFIGURE THESE ===

// Example WSDL for PromoStandards (replace with your actual WSDL URL)
const WSDL_URL = 'https://YOUR_PROMOSTANDARDS_WSDL_URL'; // Example: 'https://sandbox.promostandards.org/ProductDataService/1.0.0/ProductDataService.svc?wsdl'

// Your SanMar credentials
const USERNAME = 'YOUR_SANMAR_USERNAME'; // Example: 180384
const PASSWORD = 'YOUR_SANMAR_PASSWORD'; // Example: jH61ttGDMvWUQH

// === API endpoint ===

app.get('/api/productData', async (req, res) => {
    const { productId } = req.query;

    if (!productId) {
        return res.status(400).json({ error: 'Missing productId parameter' });
    }

    try {
        const client = await soap.createClientAsync(WSDL_URL);

        // Add basic auth if required
        client.setSecurity(new soap.BasicAuthSecurity(USERNAME, PASSWORD));

        const args = {
            productId: productId,
            language: 'en', // adjust if needed
            // You can add more parameters according to PromoStandards spec
        };

        console.log('Calling SOAP API with args:', args);

        // Example operation name — adjust this to match your WSDL operations
        const [result] = await client.GetProductDataAsync(args);

        console.log('SOAP result:', result);

        res.json(result);
    } catch (error) {
        console.error('Error calling SOAP API:', error);
        res.status(500).json({ error: error.message });
    }
});

// === Start server ===

app.listen(port, () => {
    console.log(`PromoStandards Proxy running at http://localhost:${port}`);
});
