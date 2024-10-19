import React from 'react';
import './OrderDetails.css';

function OrderDetails({ order }) {
    return (
        <div className="order-details-container">
            <h2>Order Details</h2>
            <div className="order-summary">
                <h3>Order ID: {order.id}</h3>
                <p>Date: {order.date}</p>
                <p>Total Amount: ${order.total.toFixed(2)}</p>
                <p>Payment Status: {order.paymentStatus}</p>
            </div>
            <h3>Shipping Details</h3>
            <div className="shipping-details">
                <p>Recipient Name: {order.shipping.name}</p>
                <p>Address: {order.shipping.address}</p>
                <p>City: {order.shipping.city}</p>
                <p>Zip Code: {order.shipping.zipCode}</p>
            </div>
            <h3>Ordered Products</h3>
            <ul className="ordered-products">
                {order.products.map((product) => (
                    <li key={product.id} className="ordered-product">
                        <p>Name: {product.name}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>Quantity: {product.quantity}</p>
                    </li>
                ))}
            </ul>
            <button className="reorder-btn" onClick={() => handleReorder(order)}>
                Reorder
            </button>
        </div>
    );
}

// Dummy function to handle reordering
const handleReorder = (order) => {
    console.log("Reordering:", order);
    // Implement reordering logic here
};

export default OrderDetails;
