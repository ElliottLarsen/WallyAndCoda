import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';

const User = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password1: '',
        password2: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/wallyandcoda/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    password1: '',
                    password2: ''
                });
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://127.0.0.1:8000/wallyandcoda/user/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // If update is successful, show a prompt
            alert('User account updated successfully');
            // Optionally, you can redirect the user or perform any other action here
        } catch (error) {
            console.error('Error updating user data:', error);
            // Handle error updating user data
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>No user data available</div>;
    }

    return (
        <div>
            <h2>User Information</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                </label>
                <label>
                    New Password:
                    <input type="password" name="password1" value={formData.password1} onChange={handleChange} />
                </label>
                <label>
                    Confirm New Password:
                    <input type="password" name="password2" value={formData.password2} onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default User;
