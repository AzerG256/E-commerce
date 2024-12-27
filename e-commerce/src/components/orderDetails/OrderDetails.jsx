import React from 'react';
import './OrderDetails.css';

function OrderDetails({ order, isLoading, onReorder, onDownloadInvoice }) {
    if (isLoading) {
        return <div className="loading-spinner">Loading order details...</div>;
    }

    if (!order) {
        return <div className="error-message">Failed to load order details. Please try again later.</div>;
    }

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
                        <div className="product-info">
                            <img src={product.thumbnail} alt={product.name} className="product-thumbnail" />
                            <div>
                                <p className="product-name">{product.name}</p>
                                <p>Price: ${product.price.toFixed(2)}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="order-actions">
                <button onClick={onDownloadInvoice} className="action-button">
                    Download Invoice
                </button>
                <button onClick={onReorder} className="action-button">
                    Reorder Items
                </button>
            </div>
        </div>
    );
}

export default OrderDetails;
