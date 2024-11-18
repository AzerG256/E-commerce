import React, { useState, useEffect } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cart', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                const data = await response.json();

                if (response.ok) {
                    setCartItems(data.items);
                } else {
                    setError('Unable to fetch cart items.');
                }
            } catch (err) {
                setError('Something went wrong. Please try again.');
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.ok) {
                setCartItems(cartItems.filter((item) => item.id !== id));
            } else {
                setError('Unable to remove item.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <h1>Cart</h1>
            {error && <p className="error">{error}</p>}
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button>Proceed to Checkout</button>
        </div>
    );
}

export default Cart;
