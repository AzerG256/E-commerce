import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
            if (!userId) {
                setError('User is not logged in.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/orders/${userId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch order history');
                }
                const data = await response.json();
                setOrders(data.orders || []);
            } catch (err) {
                console.error('Error fetching orders:', err); // Debugging log
                setError(err.message || 'An error occurred while fetching order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    if (loading) {
        return <div className="loading-spinner">Loading order history...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="order-history">
            <h3>Order History</h3>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order._id || order.id} className="order-item">
                            <div className="order-summary">
                                <p><strong>Order ID:</strong> {order._id || order.id}</p>
                                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                            </div>
                            <button
                                className="view-details-button"
                                onClick={() => alert(`Details for order ${order._id || order.id}`)}
                            >
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrderHistory;