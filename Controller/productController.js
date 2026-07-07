
exports.getProduct = (request, response, next) => {
    console.log("this is product middleware");
    response.send('<h1>Hello, Product!</h1>');
};

exports.createProduct = (request, response, next) => {
    console.log("this is product post middleware");
    response.send('<h1>Hello, Product Post!</h1>');
};