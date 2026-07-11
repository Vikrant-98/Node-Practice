const espress = require('express');
const router = espress.Router();
const { getProduct, createProduct, getProductById , updateProduct, deleteProduct } = require('../Controller/productController');

router.get('/', getProduct);
router.get('/:productId', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;