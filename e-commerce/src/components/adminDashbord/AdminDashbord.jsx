import React from 'react';
import ProductManagement from '../productManagement/ProductMangement'; // Import ProductManagement component
import OrderManagement from '../orderManagement/OrderManagement'; // Import OrderManagement component
import UserManagement from '../userManagement/UserManagement'; // Import UserManagement component
import './AdminDashbord.css'; // Import CSS

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <ProductManagement />
            <OrderManagement />
            <UserManagement />
        </div>
    );
};

export default AdminDashboard;
