exports.getShop = (request, response, next) => {
    console.log("this is shop middleware");
    response.send('<h1>Hello, Shop!</h1>');
};

exports.createShop = (request, response, next) => {
    console.log("this is shop post middleware");
    response.send('<h1>Hello, Shop Post!</h1>');
}