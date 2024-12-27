// routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct } = require('../controllers/ProductController');
const router = express.Router();

// Get all products
router.get('/', getProducts);

// Add a new product
router.post('/add', addProduct);

module.exports = router;
