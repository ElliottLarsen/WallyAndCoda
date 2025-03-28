import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import '../styles/puprecords.css';

import AddPupRecord from './AddPupRecord';
import ContentCard from './ContentCard';


const PupRecords = () => {
    const navigateTo = useNavigate();
    const [pups, setPups] = useState([]);
    const [selectedPup, setSelectedPup] = useState('');
    const [records, setRecords] = useState([]);

    const [newRecordTab, setNewRecordTab] = useState();
    const [isActive, setIsActive] = useState('pupDisplay');

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
            if (response.data.length > 0) {
                setSelectedPup(response.data[0].id);
                fetchRecords(response.data[0].id);
            }
        } catch (error) {
            console.error('Error fetching pups:', error);
            if (error.response.status === 401) {
                // Unauthorized, redirect to login page
                navigateTo('/login');
            }
        }
    };

    const fetchRecords = async (pup_id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://127.0.0.1:8000/wallyandcoda/pup/record/${pup_id}/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const handlePupChange = (e) => {
        const { value } = e.target;
        setSelectedPup(value);
        fetchRecords(value);
    };

    const handleDeleteRecord = async (record_id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/wallyandcoda/pup/record/${record_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Fetch records again to update UI
            fetchRecords(selectedPup);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    function handleClick(value) {
        setIsActive(value);
    }

    let pupDropdown = (
        <>
            <label style={{ textAlign: 'center' }} htmlFor="pup">Select a Pup</label>
            <select id="pup" name="pup" value={selectedPup} onChange={handlePupChange}>
                {pups.map(pup => (
                    <option key={pup.id} value={pup.id}>{pup.pup_name}</option>
                ))}
            </select>
        </>
    );

    let pupRecord = (
        <>
            <ul>
            {records.map(record => (
                <li className='pup-record' key={record.id}>
                    <span>{record.record_type} - {record.record_date.split('T')[0]} - Dr. {record.doctor_name} - {record.vet_address} - {record.vet_phone_number} - ${record.cost} - {record.record_note}</span>
                    <FontAwesomeIcon className='trash' icon={faTrash} onClick={() => handleDeleteRecord(record.id)} />
                </li>
            ))}
            </ul>
        </>
    );

    return (

        <div className='flex-container'>
            {(isActive === 'pupDisplay') ? (
                <>
                    <div className='add-button'>
                        <button onClick={() => handleClick('addRecord')}>+ new record</button>
                    </div>
                    <div className='square white'>
                        <ContentCard className={'pup-dropdown'} content={pupDropdown} />
                        <ContentCard className={'pup-record'} content={pupRecord} />
                    </div>
                </>

            ) : (
                <div className='square white'>
                    <AddPupRecord choosenPup={selectedPup} isActive={isActive} setIsActive={setIsActive} />
                </div>
            )}
        </div>
    );
};

export default PupRecords;
