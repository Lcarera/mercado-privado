const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());

app.get('/api/items' , cors(), async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=5`);
    let categories = [];
    if (response.data.filters.length !== 0) {
        categories = response.data.filters.find(filter => filter.id === 'category').values[0].path_from_root.map(category => category.name);
    }
    const items = response.data.results.map(result => ({
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: Math.floor(result.price),
        decimals: result.price % 1 ? Number(result.price.toString().split('.')[1]) : 0
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
      state_name: result.address.state_name
    }));
    const author = {
      name: 'Luciano',
      lastname: 'Carera'
    };
    const data = {
      author,
      categories,
      items
    };
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});