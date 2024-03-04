import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/mypups.css'

const MyPups = () => {
    const navigateTo = useNavigate();
    const [pups, setPups] = useState([]);
    const [formData, setFormData] = useState({
        pup_name: '',
        pup_sex: '',
        microchip_number: '',
        akc_registration_number: '',
        akc_registration_name: ''
    });

    useEffect(() => {
        fetchPups();
    }, []);

    const fetchPups = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/wallyandcoda/pup/my_pups', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPups(response.data);
        } catch (error) {
            console.error('Error fetching pups:', error);
            if (error.response.status === 401) {
                // Unauthorized, redirect to login page
                navigateTo('/login');
            }
        }
    };

    const handlePupChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePupSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://127.0.0.1:8000/wallyandcoda/pup/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Clear form data
            setFormData({
                pup_name: '',
                pup_sex: '',
                microchip_number: '',
                akc_registration_number: '',
                akc_registration_name: ''
            });
            // Fetch pups again to update UI
            fetchPups();
        } catch (error) {
            console.error('Error adding pup:', error);
        }
    };

    const handleDeletePup = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/wallyandcoda/pup/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Fetch pups again to update UI
            fetchPups();
        } catch (error) {
            console.error('Error deleting pup:', error);
        }
    };

    return (
        <div className='mypups-container'>
            <h1>My Pups</h1>
            <ul>
                {pups.map(pup => (
                    <li key={pup.id}>
                        <span>{pup.pup_name}</span>
                        <button onClick={() => handleDeletePup(pup.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handlePupSubmit}>
                <input type="text" name="pup_name" placeholder="Pup Name" value={formData.pup_name} onChange={handlePupChange} required />
                <input type="text" name="pup_sex" placeholder="Pup Sex" value={formData.pup_sex} onChange={handlePupChange} required />
                <input type="text" name="microchip_number" placeholder="Microchip Number" value={formData.microchip_number} onChange={handlePupChange} required />
                <input type="text" name="akc_registration_number" placeholder="AKC Registration Number" value={formData.akc_registration_number} onChange={handlePupChange} required />
                <input type="text" name="akc_registration_name" placeholder="AKC Registration Name" value={formData.akc_registration_name} onChange={handlePupChange} required />
                <button type="submit">Add Pup</button>
            </form>
        </div>
    );
};

export default MyPups;
