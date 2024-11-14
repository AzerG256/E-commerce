// routes/cartRoutes.js
const express = require('express');
const { addToCart } = require('../controllers/cartController');
const router = express.Router();

// Add product to cart
router.post('/add', addToCart);

module.exports = router;
