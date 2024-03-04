import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/puprecords.css';

const PupRecords = () => {
    const navigateTo = useNavigate();
    const [pups, setPups] = useState([]);
    const [selectedPup, setSelectedPup] = useState('');
    const [records, setRecords] = useState([]);
    const [recordFormData, setRecordFormData] = useState({
        record_type: '',
        record_date: '',
        doctor_name: '',
        vet_address: '',
        vet_phone_number: '',
        cost: '',
        record_note: ''
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

    const handleRecordChange = (e) => {
        const { name, value } = e.target;
        setRecordFormData({
            ...recordFormData,
            [name]: value
        });
    };

    const handleRecordSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://127.0.0.1:8000/wallyandcoda/pup/record/${selectedPup}`, {
                ...recordFormData,
                cost: parseFloat(recordFormData.cost) // Convert cost to float
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Clear record form data
            setRecordFormData({
                record_type: '',
                record_date: '',
                doctor_name: '',
                vet_address: '',
                vet_phone_number: '',
                cost: '',
                record_note: ''
            });
            // Fetch records again to update UI
            fetchRecords(selectedPup);
        } catch (error) {
            console.error('Error adding record:', error);
        }
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

    return (
        <div className='flex-container'>
            <div className='squre white'>
                <div className="pup-dropdown">
                    <label htmlFor="pup">Select a Pup:</label>
                    <select id="pup" name="pup" value={selectedPup} onChange={handlePupChange}>
                        {pups.map(pup => (
                            <option key={pup.id} value={pup.id}>{pup.pup_name}</option>
                        ))}
                    </select>
                </div>
                <ul>
                    {records.map(record => (
                        <li className='pup-record' key={record.id}>
                            <span>{record.record_type} - {record.record_date.split('T')[0]} - Dr. {record.doctor_name} - {record.vet_address} - {record.vet_phone_number} - ${record.cost} - {record.record_note}</span>
                            <FontAwesomeIcon className='trash' icon={faTrash} onClick={() => handleDeleteRecord(record.id)} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className='square white'>
                <form onSubmit={handleRecordSubmit}>
                    <label htmlFor="record_type">Record Type: </label>
                    <input type="text" name="record_type" placeholder="Record Type" value={recordFormData.record_type} onChange={handleRecordChange} required />
                    <label htmlFor="record_date">Record Date: </label>
                    <input type="date" name="record_date" value={recordFormData.record_date} onChange={handleRecordChange} required />
                    <label htmlFor="doctor_name">Doctor: </label>
                    <input type="text" name="doctor_name" placeholder="Doctor Name" value={recordFormData.doctor_name} onChange={handleRecordChange} required />
                    <label htmlFor="vet_address">Address: </label>
                    <input type="text" name="vet_address" placeholder="Vet Address" value={recordFormData.vet_address} onChange={handleRecordChange} required />
                    <label htmlFor="vet_phone_number">Phone Number: </label>
                    <input type="text" name="vet_phone_number" placeholder="Vet Phone Number" value={recordFormData.vet_phone_number} onChange={handleRecordChange} required />
                    <label htmlFor="cost">Cost: </label>
                    <input type="text" name="cost" placeholder="Cost" value={recordFormData.cost} onChange={handleRecordChange} required />
                    <label htmlFor="record_note">Note: </label>
                    <input type="text" name="record_note" placeholder="Record Note" value={recordFormData.record_note} onChange={handleRecordChange} />
                    <button type="submit">Add Record</button>
                </form>
            </div>
        </div>
    );
};

export default PupRecords;
