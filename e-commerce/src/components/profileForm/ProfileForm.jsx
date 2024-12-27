import React, { useState, useEffect } from 'react';
import './ProfileForm.css';

function ProfileForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch user details from backend
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setEmail(data.email);
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                setMessage('Profile updated successfully!');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Error updating profile.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Something went wrong.');
        }
    };

    return (
        <form className="profile-form" onSubmit={handleUpdate}>
            <h3>Update Profile</h3>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Update</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default ProfileForm;