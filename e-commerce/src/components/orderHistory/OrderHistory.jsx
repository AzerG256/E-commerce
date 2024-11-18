import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch order history from backend
        const fetchOrderHistory = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data.orders);
                } else {
                    console.error('Failed to fetch order history');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchOrderHistory();
    }, []);

    return (
        <div className="order-history">
            <h3>Order History</h3>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <p>Order ID: {order.id}</p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p>Total: ${order.total.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}

export default OrderHistory;
