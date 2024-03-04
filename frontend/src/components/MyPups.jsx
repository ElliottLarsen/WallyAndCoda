import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/mypups.css'

const MyPups = () => {
    const navigateTo = useNavigate();
    const [pups, setPups] = useState([]);
    const [selectedPup, setSelectedPup] = useState(null);
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
            // Reset selectedPup to null
            setSelectedPup(null);
            // Fetch pups again to update UI
            fetchPups();
        } catch (error) {
            console.error('Error deleting pup:', error);
        }
    };
    

    const handlePupClick = (pup) => {
        setSelectedPup(prevSelectedPup => {
            if (prevSelectedPup && prevSelectedPup.id === pup.id) {
                // If the same pup is clicked again, fold back its information
                return null;
            } else {
                // Otherwise, show the information of the clicked pup
                return pup;
            }
        });
    };

    return (
        <div className='flex-container'>
            <div className='square white'>
                <ul>
                    {pups.map(pup => (
                        <li key={pup.id} onClick={() => handlePupClick(pup)}>
                            <span>{pup.pup_name}</span>
                            <FontAwesomeIcon className='trash' icon={faTrash} onClick={() => handleDeletePup(pup.id)} />
                        </li>
                    ))}
                </ul>            
                {selectedPup && (<div className='pup'>
                    <h2>{selectedPup.pup_name}</h2>
                    <p>Sex: {selectedPup.pup_sex}</p>
                    <p>Microchip Number: {selectedPup.microchip_number}</p>
                    <p>AKC Registration Number: {selectedPup.akc_registration_number}</p>
                    <p>AKC Registration Name: {selectedPup.akc_registration_name}</p>
                </div>

                )}

            </div>
            <div className='square white'>
                <form onSubmit={handlePupSubmit}>
                <label htmlFor="pup_name">Pup Name: </label>
                    <input type="text" name="pup_name" placeholder="Pup Name" value={formData.pup_name} onChange={handlePupChange} required />
                    <label htmlFor="pup_sex">Pup Sex: </label>
                    <input type="text" name="pup_sex" placeholder="Pup Sex" value={formData.pup_sex} onChange={handlePupChange} required />
                    <label htmlFor="microchip_number">Microchip Number: </label>
                    <input type="text" name="microchip_number" placeholder="Microchip Number" value={formData.microchip_number} onChange={handlePupChange} required />
                    <label htmlFor="akc_registration_number">AKC Reg. #: </label>
                    <input type="text" name="akc_registration_number" placeholder="AKC Registration Number" value={formData.akc_registration_number} onChange={handlePupChange} required />
                    <label htmlFor="akc_registration_name">AKC Reg. Name: </label>
                    <input type="text" name="akc_registration_name" placeholder="AKC Registration Name" value={formData.akc_registration_name} onChange={handlePupChange} required />
                    <button type="submit">Add Pup</button>
                </form>
            </div>
        </div>
    );
};

export default MyPups;
