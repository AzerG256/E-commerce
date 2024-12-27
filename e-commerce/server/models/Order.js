const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    products: [
        {
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        street: String,
        city: String,
        postalCode: String,
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
