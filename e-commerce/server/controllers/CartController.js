const Cart = require('../models/Cart');

// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId });

        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            // If cart exists, add or update item
            const item = cart.items.find(item => item.productId.toString() === productId);
            if (item) {
                item.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
