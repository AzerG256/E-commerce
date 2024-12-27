const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const formattedProducts = products.map(product => ({
            id: product._id, // Map _id to id
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            stock: product.stock,
            createdAt: product.createdAt
        }));
        res.status(200).json(formattedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
