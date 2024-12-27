import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
        
                const data = await response.json();
        
                if (response.ok) {
                    setCartItems(data.items); // Assuming backend populates product details
                } else {
                    alert(data.message || 'Unable to fetch cart items.');
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
                alert('Something went wrong. Please try again.');
            }
        };
        

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.ok) {
                setCartItems(cartItems.filter((item) => item.product._id !== itemId));
            } else {
                setError('Unable to remove item.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    // Proceed to checkout
    const handleProceedToCheckout = () => {
        if (cartItems.length === 0) {
            setError('Your cart is empty. Add items before proceeding to checkout.');
            return;
        }

        navigate('/checkout', { state: { cartItems } });
    };

    return (
        <div className="cart-container">
            <h1>Cart</h1>
            {error && <p className="error">{error}</p>}
            <ul>
                {cartItems.map((item) => (
                    <li key={item.product._id}>
                        {item.product.name} - ${item.product.price} x {item.quantity}
                        <button onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
    );
}

export default Cart;