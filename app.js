const http = require('http');
const express = require('express');
const productRoutes = require('./Routes/product');
const shopRoutes = require('./Routes/shop');
// const { requestAccepter1, requestAccepter2, requestAccepter3 } = require('./Services/services');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/product", productRoutes);
app.use("/shop", shopRoutes);

app.listen(3000);