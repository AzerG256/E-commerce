const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const user = req.user._id; // From the middleware
        const { productId, quantity } = req.body;

        // Validate inputs
        if (!mongoose.Types.ObjectId.isValid(productId) || quantity <= 0) {
            return res.status(400).json({ message: "Invalid product ID or quantity." });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ user });

        if (!cart) {
            cart = new Cart({
                user,
                items: [{ product: productId, quantity }],
            });
        } else {
            const existingItem = cart.items.find(item => item.product.toString() === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const user = req.user._id; // From the middleware
        const { productId } = req.params; // Get productId from request parameters

        // Validate productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID." });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        // Find the index of the item to be removed
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: "Item removed from cart successfully", cart });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
// Get cart details
exports.getCart = async (req, res) => {
    try {
        // Debugging: Check if req.user is populated
        console.log('Controller: req.user:', req.user);

        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: 'User not authenticated.' });
        }

        const user = req.user._id;

        // Find the user's cart and populate product details
        let cart = await Cart.findOne({ user }).populate('items.product');

        if (!cart) {
            // Create a new empty cart for the user if none exists
            cart = new Cart({ user, items: [] });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

  