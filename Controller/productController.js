
const Product = require('../Model/products');

exports.getProduct = async (request, response, next) => {
    console.log("this is product middleware");
    const products = await Product.fetchAll();
    response.json(products);
};

exports.createProduct = (request, response, next) => {
    console.log("this is product post middleware");
    const { id,title, imageUrl, description, price } = request.body;
    const newProduct = new Product(id, title, imageUrl, description, price);
    newProduct.save();
    response.status(201).json(newProduct);
};