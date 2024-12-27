const express = require('express');
const {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/OrderController');
const router = express.Router();
    
// Create a new order
router.post('/create', createOrder);

// Get all orders for a specific user
router.get('/:userId', getUserOrders);

// Admin: Get all orders
router.get('/admin/all', getAllOrders);

// Admin: Update order status
router.patch('/:orderId', updateOrderStatus);

module.exports = router;