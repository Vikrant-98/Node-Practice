
const Product = require('../Model/products');

exports.getProduct =  (request, response, next) => {
    console.log("this is product middleware");
    const products = Product.findAll().then(products => {
        return products;
    }).then(products => {
        console.log(products);
        response.json(products);
    }).catch(err => {
        console.log(err);
    });
};

exports.createProduct = async (request, response, next) => {
    console.log("this is product post middleware");
    const { title, imageUrl, description, price } = request.body;

    Product.create({
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price
    }).then(product => {
        console.log(product);
        response.status(201).json({ message: 'Product created successfully' });
    }).catch(err => {
        console.log(err);
    });    
};