import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import AlertModal from './AlertModal';
import UserDisplay from './UserDisplay';
import UserForm from './UserForm';


const User = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isActiveAlert, setIsActiveAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password1: '',
        password2: ''
    });

    const [isActive, setIsActive] = useState('userDisplay');

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
            setAlertMessage('User account updated successfully');
            setIsActiveAlert(true);
            // alert('User account updated successfully');
            setIsActive('userDisplay');
        } catch (error) {
            console.error('Error updating user data:', error);
            setAlertMessage('Error updating user data.');
            setIsActiveAlert(true);
        }
    };

    function handleEditClick() {
        setIsActive('editUser');
    }

    const closeAlertModal = () => {
        setIsActiveAlert(false);
    }

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
        <div className='flex-container'>
            <div className='square brown'>
                <hr />
                <h1>{userData.username}'s Account</h1>
                <hr />
            </div>
            {(isActive === 'userDisplay') ? (
                <div>
                    <UserDisplay currentUser={formData} />
                    <div>
                        <FontAwesomeIcon
                            icon={faEdit}
                            style={{ cursor: 'pointer', float: 'right' }}
                            onClick={handleEditClick}
                        />
                    </div>
                </div>
            ) : (
                <UserForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setIsActive={setIsActive}
                />
            )}
            {isActiveAlert && <AlertModal close={closeAlertModal} content={alertMessage} />}
        </div>
    );
};

export default User;