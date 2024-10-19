import React from 'react';
import ProfileForm from '../profileForm/ProfileForm';
import OrderHistory from '../orderHistory/OrderHistory';
import './UserProfile.css';

function UserProfile() {
    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <ProfileForm />
            <OrderHistory />
        </div>
    );
}

export default UserProfile;
