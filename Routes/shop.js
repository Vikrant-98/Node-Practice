const express = require('express');
const router = express.Router();

const { getShop, createShop } = require('../Controller/shopController');

router.get('/', getShop);
router.post('/', createShop);

module.exports = router;