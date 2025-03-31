import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/mypups.css'

import AddPup from './AddPup';
import PupModal from './PupModal';
import ContentCard from './ContentCard';

const MyPups = () => {
    const navigateTo = useNavigate();
    const [pups, setPups] = useState([]);
    const [selectedPup, setSelectedPup] = useState('');

    const [isActive, setIsActive] = useState('pupDisplay')
    const [activeModal, setActiveModal] = useState(false);

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

    const openPupModal = (pup) => {
        setSelectedPup(pup);
        setActiveModal(true);
    }

    const closePupModal = () => {
        setActiveModal(false);
        setSelectedPup(null);
    }

    // This can be extracted into its own component
    let myPups = (
        <>
            <table>
                <tbody>
                    {pups.map(pup => (
                        <tr key={pup.id}>
                            <th style={{cursor:"pointer"}} onClick={() => openPupModal(pup)}>{pup.pup_name}</th>
                            <td style={{cursor:"pointer"}}>
                                <FontAwesomeIcon
                                    className='trash'
                                    icon={faTrash}
                                    onClick={() => handleDeletePup(pup.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {activeModal && selectedPup && (
                <PupModal currentPup={selectedPup} close={closePupModal} />
            )}
        </>
    );


    return (
        <div className='container'>
            {(isActive === 'pupDisplay') ? (
                <div>
                    <div>
                        <button className='add-button' onClick={() => handleClick('addPup')}>+ new pup</button>
                    </div>
                    <ContentCard className={"my-pups"} content={myPups} />
                </div>
            ) : (
                <div>
                    <AddPup updatePups={fetchPups} setIsActive={setIsActive} />
                </div>
            )}
        </div>
    );
};

export default MyPups;
