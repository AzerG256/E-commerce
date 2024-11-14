// routes/productRoutes.js
const express = require('express');
const { getAllProducts, addProduct } = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Add a new product
router.post('/add', addProduct);

module.exports = router;
