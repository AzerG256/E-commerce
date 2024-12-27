// OrderController.js
const Order = require('../models/Order'); // Assuming you have an Order model

// Create a new order
exports.createOrder = async (req, res) => {
    console.log('Request Body:', req.body); // Add this line for debugging
    const { user, products, totalAmount, shippingAddress, status } = req.body;

    if (!user || !products || !totalAmount || !shippingAddress) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newOrder = new Order({
            user,
            products,
            totalAmount,
            shippingAddress,
            status: status || 'Processing',
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ error: 'Failed to create order', details: err.message });
    }
};

// Get all orders for a specific user
exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ user: userId });
        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user orders' });
    }
};

// Get all orders for admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
// Update order status
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) return res.status(404).json({ error: 'Order not found' });

        res.status(200).json({ message: 'Order status updated', order });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
};
