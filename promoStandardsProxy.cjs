const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');

const app = express();
app.use(bodyParser.json());

// IMPORTANT: use environment PORT for Render
const PORT = process.env.PORT || 4000;

const WSDL_URL = 'https://ws.sanmar.com/ProductDataService.svc?singleWsdl';
const username = 'melaniesue9972';
const password = 'Alan1963!';

app.post('/api/productData', async (req, res) => {
  const { productId } = req.body;
  console.log('Incoming request to /api/productData with productId:', productId);

  if (!productId) {
    console.log('Missing productId in request body');
    return res.status(400).send('Missing productId');
  }

  try {
    console.log(`Using WSDL URL: ${WSDL_URL}`);
    const client = await soap.createClientAsync(WSDL_URL);

    client.setSecurity(new soap.BasicAuthSecurity(username, password));

    const args = {
      ProductId: productId,
      Language: 'en',
      Currency: 'USD'
    };

    console.log('Calling GetProduct with args:', args);
    const [result] = await client.GetProductAsync(args);

    console.log('SOAP API result:', result);
    res.send(result);
  } catch (error) {
    console.error('Error calling SOAP API:', error.message);
    res.status(500).send(`Error calling SOAP API: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`✅ PromoStandards Proxy running at http://localhost:${PORT}`);
});
