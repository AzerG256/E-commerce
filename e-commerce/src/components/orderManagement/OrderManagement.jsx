import React from 'react';
import '../adminDashbord/AdminDashbord.css'; 
const OrderManagement = () => {
    return (
        <div className="order-management">
            <h2>Order Management</h2>
            {/* Display list of orders with options to view/update status */}
            <button>View Orders</button>
        </div>
    );
};

export default OrderManagement;
