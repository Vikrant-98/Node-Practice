
const Product = require('../Model/products');

// exports.getProduct =  (request, response, next) => {
//     console.log("this is product middleware");
//     const products = Product.findAll().then(products => {
//         return products;
//     }).then(products => {
//         console.log(products);
//         response.json(products);
//     }).catch(err => {
//         console.log(err);
//     });
// };

exports.getProduct = async (req, res, next) => {
    try {
        // Default values
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const products = await Product.findAll({
            limit,
            offset,
            order: [['id', 'ASC']] // Recommended for consistent pagination
        });

        res.status(200).json(products);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};

exports.getProductById = (request, response, next) => {
    var productId = request.params.productId;
    const products = Product.findAll( { where: { id: productId } })
    .then(products => {
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

exports.updateProduct = async (req, res) => {
    try {

        const id = req.params.id;

        const product = await Product.findByPk(id).then(product => {
            
            var { title, imageUrl, description, price } = req.body;
            if (title) product.title = title;
            if (imageUrl) product.imageUrl = imageUrl;
            if (description) product.description = description;
            if (price) product.price = price;

            return product.save();

        })
        .then(updatedProduct => {
            return res.status(200).json({
            message: "Product updated successfully"
        });
        })
        .catch(err => {
            console.log(err);
        });
       

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;

        Product.findByPk(id)
            .then(product => {

                if (!product) {
                    return res.status(404).json({
                        message: "Product not found"
                    });
                }

                product.destroy();
                return res.status(200).json({
                    message: "Product deleted successfully"
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    message: err.message
                });
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};