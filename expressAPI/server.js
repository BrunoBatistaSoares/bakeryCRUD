const express = require('express');
const pool = require('./database');
const cors = require('cors')
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send("home")
});

app.get('/products', async (req, res) => {
    const products = await pool.query(
        'SELECT * from categories, product_categories, products where products.product_id = product_categories.product_id and product_categories.categorie_id = categories.categorie_id;'
    )
    res.send(products.rows);
});

app.get('/products/:category', async (req, res) => {
    const { category } = req.params;
    const products = await pool.query(
        'SELECT * from categories, product_categories, products where products.product_id = product_categories.product_id and product_categories.categorie_id = categories.categorie_id and categories.categorie_name = $1;', [category]
    )
    res.send(products.rows);
});

app.listen(4000, () => console.log("running on port 4000"));