import React, { useState } from 'react';
import './ProfileForm.css';

function ProfileForm() {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [password, setPassword] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        // Add logic to handle profile update
        console.log("Updated Info:", { name, email, password });
        setPassword(''); // Clear password field after submission
    };

    return (
        <form onSubmit={handleUpdate} className="profile-form">
            <h3>Update Profile</h3>
            <div className="input-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="update-btn">Update Profile</button>
        </form>
    );
}

export default ProfileForm;
