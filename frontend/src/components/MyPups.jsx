import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/mypups.css'

import AddPup from './AddPup';

const MyPups = () => {
    const navigateTo = useNavigate();
    const [pups, setPups] = useState([]);
    const [selectedPup, setSelectedPup] = useState(null);

    const [isActive, setIsActive] = useState('pupDisplay')

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

    function handleClick(value) {
        setIsActive(value);
    }

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

    let myPups = (
        <ul>
            {pups.map(pup => (
                <li key={pup.id} onClick={() => handlePupClick(pup)}>
                    <span>{pup.pup_name}</span>
                    <FontAwesomeIcon className='trash' icon={faTrash} onClick={() => handleDeletePup(pup.id)} />
                </li>
            ))}
        </ul>
    );

    return (
        <div className='container'>
            {(isActive === 'pupDisplay') ? (
                <div className='square white'>
                    <div>
                        <button className='add-button' onClick={() => handleClick('addPup')}>+ new record</button>
                    </div>
                    {myPups}
                    {selectedPup && (
                        <div className='pup'>
                            <h2>{selectedPup.pup_name}</h2>
                            <p>Sex: {selectedPup.pup_sex}</p>
                            <p>Microchip Number: {selectedPup.microchip_number}</p>
                            <p>AKC Registration Number: {selectedPup.akc_registration_number}</p>
                            <p>AKC Registration Name: {selectedPup.akc_registration_name}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <AddPup setIsActive={setIsActive} />
                </div>
            )}
        </div>
    );
};

export default MyPups;
