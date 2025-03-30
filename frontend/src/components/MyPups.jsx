import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/mypups.css'

import AddPup from './AddPup';
import PupDropdown from './PupDropdown';
import PupModal from './PupModal';
import ContentCard from './ContentCard';

const MyPups = () => {
    const navigateTo = useNavigate();
    const dialog = useRef();
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

    // const handlePupClick = (pup) => {
    //     setSelectedPup(prevSelectedPup => {
    //         if (prevSelectedPup && prevSelectedPup.id === pup.id) {
    //             // If the same pup is clicked again, fold back its information
    //             return null;
    //         } else {
    //             // Otherwise, show the information of the clicked pup
    //             return pup;
    //         }
    //     });
    // };

    const openPupModal = (pup) => {
        setSelectedPup(pup);
        setActiveModal(true);
    }

    const closePupModal = () => {
        setActiveModal(false);
        setSelectedPup(null);
    }

    function handlePupClick(pup) {
        setSelectedPup(pup);
        dialog.current.open()
    }

    function handleClose() {
        setSelectedPup(null);
    }


    // let myPups = (
    //     <PupDropdown pups={pups} selectPup={selectedPup} handleChange={handlePupClick} />
    // )

    let myPups = (
        <>
        <ul>
            {pups.map(pup => (
                <li key={pup.id} onClick={() => openPupModal(pup)}>
                    <span>{pup.pup_name}</span>
                    <FontAwesomeIcon className='trash' icon={faTrash} onClick={() => handleDeletePup(pup.id)} />
                </li>
            ))}
        </ul>
        {activeModal && selectedPup && (
                <PupModal currentPup={selectedPup} close={closePupModal} />
            )}
        </>
    );

    // let pupSelect = (
    //     <>
    //         <h2>{selectedPup.pup_name}</h2>
    //             <p>Sex: {selectedPup.pup_sex}</p>
    //             <p>Microchip Number: {selectedPup.microchip_number}</p>
    //             <p>AKC Registration Number: {selectedPup.akc_registration_number}</p>
    //             <p>AKC Registration Name: {selectedPup.akc_registration_name}</p>
    //     </>
    // );

    return (
        <div className='container'>
            {(isActive === 'pupDisplay') ? (
                <div className='square white'>
                    <div>
                        <button className='add-button' onClick={() => handleClick('addPup')}>+ new pup</button>
                    </div>
                    <ContentCard className={""} content={myPups} />
                    
                    {/* {selectedPup ? {pupSelect} : null} */}

                </div>
            ) : (
                <div>
                    <AddPup updatedPups={fetchPups} setIsActive={setIsActive} />
                </div>
            )}
        </div>
    );
};

export default MyPups;
