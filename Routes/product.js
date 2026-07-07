const espress = require('express');
const router = espress.Router();
const { getProduct, createProduct } = require('../Controller/productController');

router.get('/', getProduct);
router.post('/', createProduct);

module.exports = router;