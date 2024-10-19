import React from 'react'
import { useState } from 'react';
import ProductCard from '../productCard/productCard';
import './cart.css'
function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Product 1",
            description: "This is the first product.",
            price: 29.99,
            image: "https://via.placeholder.com/250",
            quantity: 1
        },
        {
            id: 2,
            name: "Product 2",
            description: "This is the second product.",
            price: 39.99,
            image: "https://via.placeholder.com/250",
            quantity: 2
        }
    ]);

    const updateQuantity = (id, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <ProductCard Product={item} />
                        <div className="cart-controls">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    updateQuantity(item.id, parseInt(e.target.value))
                                }
                            />
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
}
export default Cart;