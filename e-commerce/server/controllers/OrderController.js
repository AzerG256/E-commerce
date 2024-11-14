const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { userId, items, shippingAddress, paymentMethod, totalPrice } = req.body;
        const order = new Order({
            userId,
            items,
            shippingAddress,
            paymentMethod,
            totalPrice,
            status: 'Pending'
        });
        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
