import React, { useEffect, useState } from 'react';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders/admin/all', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data.orders);
                } else {
                    setError('Failed to fetch orders');
                }
            } catch (err) {
                setError('An error occurred while fetching orders');
            } finally {
                setLoading(false);
            }
        };


        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
                );
            } else {
                alert('Failed to update order status');
            }
        } catch (err) {
            alert('An error occurred while updating order status');
        }
    };
    if (loading) {
        return <div className="loading-spinner">Loading orders...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const filteredOrders = orders.filter((order) =>
        filter ? order.status.toLowerCase().includes(filter.toLowerCase()) : true
    );

    return (
        <div className="order-management">
            <h2>Order Management</h2>

            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Filter by status..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {filteredOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.date}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderManagement;
