import React from 'react';
import './OrderHistory.css';

function OrderHistory() {
    const orders = [
        { id: 1, date: '2023-09-10', total: 59.99 },
        { id: 2, date: '2023-09-15', total: 29.99 },
        { id: 3, date: '2023-09-20', total: 49.99 },
    ];

    return (
        <div className="order-history">
            <h3>Order History</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Date: {order.date}</p>
                        <p>Total: ${order.total.toFixed(2)}</p>
                        <button onClick={() => console.log(`Viewing order ${order.id}`)}>View Order</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderHistory;
