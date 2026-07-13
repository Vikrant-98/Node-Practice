//const http = require('http');
const express = require('express');
const productRoutes = require('./Routes/product');
const shopRoutes = require('./Routes/shop');
const userRoutes = require('./Routes/user');
// const { requestAccepter1, requestAccepter2, requestAccepter3 } = require('./Services/services');
const bodyParser = require('body-parser');
const sequelize = require('./DBServices/sequelizer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/product", productRoutes);
app.use("/shop", shopRoutes);
app.use("/users", userRoutes);
sequelize.sync().then(result => {
    //console.log(result);
    console.log("Database connected successfully");
}).catch(err => {
    console.log(err);
});

app.listen(3000);