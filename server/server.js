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

app.get('/api/items/:id', cors(), async (req, res) => {
    try {
      const itemId = req.params.id;
      const itemResponse = await axios.get(`https://api.mercadolibre.com/items/${itemId}`);
      const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${itemId}/description`);
      const item = {
        id: itemResponse.data.id,
        title: itemResponse.data.title,
        price: {
          currency: itemResponse.data.currency_id,
          amount: Math.floor(itemResponse.data.price),
          decimals: itemResponse.data.price % 1 ? Number(itemResponse.data.price.toString().split('.')[1]) : 0
        },
        picture: itemResponse.data.pictures[0],
        condition: itemResponse.data.condition,
        free_shipping: itemResponse.data.shipping.free_shipping,
        sold_quantity: itemResponse.data.sold_quantity,
        description: descriptionResponse.data.plain_text,
        permalink: itemResponse.data.permalink,
        category_id: itemResponse.data.category_id
      };
      const author = {
        name: 'Luciano',
        lastname: 'Carera'
      };
      const categoriesResponse = await axios.get(`https://api.mercadolibre.com/categories/${item.category_id}`);
      const categories = {
        breadcrumb : categoriesResponse.data.path_from_root.map(category => category.name)
      }
      const data = {
        author,
        item,
        categories
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