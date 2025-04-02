import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/mypups.css'

import PupForm from './PupForm';
import DisplayPup from './DisplayPup';
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

    const handleEditClick = (pup, value) => {
        setIsActive(value);
        setSelectedPup(pup);
        fetchPups();
    }

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

    let displayPup = (
        <DisplayPup currentPup={selectedPup} />
    );

    // This can be extracted into its own component
    let myPups = (
        <>
            <table className='my-pups'>
                <tbody>
                    {pups.map(pup => (
                        <tr key={pup.id}>
                            <th onClick={() => openPupModal(pup)}>{pup.pup_name}</th>
                            <td>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    onClick={() => handleEditClick(pup, 'editPup')}
                                />
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
                <PupModal content={displayPup} close={closePupModal} />
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
            ) : ((isActive !== 'editPup') ? (
                <div>
                    <PupForm
                        httpType={'post'}
                        updatePups={fetchPups}
                        setIsActive={setIsActive}
                    />
                </div>
            ) : (
                <div>
                    <PupForm
                        httpType={'put'}
                        updatePups={fetchPups}
                        pup_id={selectedPup.id}
                        setIsActive={setIsActive}
                    />
                </div>
            ))}
        </div>
    );
};

export default MyPups;
