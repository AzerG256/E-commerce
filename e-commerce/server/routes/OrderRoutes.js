// routes/orderRoutes.js
const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

// Create a new order
router.post('/create', createOrder);

// Get all orders for a specific user
router.get('/:userId', getUserOrders);

module.exports = router;
