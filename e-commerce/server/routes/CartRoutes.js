const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/CartController'); // Import the removeFromCart function
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Add product to cart
router.post('/add', protect, addToCart);

// Get cart details
router.get('/', protect, getCart);

// Remove product from cart
router.delete('/:productId', protect, removeFromCart); // Add this line for removing an item

module.exports = router;