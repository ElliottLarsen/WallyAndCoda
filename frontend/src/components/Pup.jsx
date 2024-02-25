import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pup.css'

const Pup = () => {
    const navigateTo = useNavigate();
    const [pups, setPups] = useState([]);
    const [formData, setFormData] = useState({
        pup_name: '',
        pup_sex: '',
        microchip_number: '',
        akc_registration_number: '',
        akc_registration_name: ''
    });
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
    const [activePup, setActivePup] = useState(null);


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
            console.log(response)
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

    const handleRecordChange = (e) => {
        const { name, value } = e.target;
        setRecordFormData({
            ...recordFormData,
            [name]: value
        });
    };

    const handleRecordSubmit = async (e, pup_id) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://127.0.0.1:8000/wallyandcoda/pup/record/${pup_id}`, {
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
            fetchRecords(pup_id);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    const handleDeleteRecord = async (record_id, pup_id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/wallyandcoda/pup/record/${record_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Fetch records again to update UI
            fetchRecords(pup_id);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const toggleAccordion = (pup_id) => {
        setActivePup(activePup === pup_id ? null : pup_id);
        if (activePup !== pup_id) {
            fetchRecords(pup_id);
        }
    };

    return (
        <div>
            <h2>Pups</h2>
            <ul>
                {pups.map(pup => (
                    <ul key={pup.id}>
                        <button className="accordion" onClick={() => toggleAccordion(pup.id)}>
                            {pup.pup_name}
                        </button>
                        {activePup === pup.id && (
                            <div className="panel">
                                <button onClick={() => handleDeletePup(pup.id)}>Delete Pup</button>
                                <button onClick={() => fetchRecords(pup.id)}>View Records</button>
                                <ul>
                                    {records.map(record => (
                                        <li key={record.id}>
                                            {record.record_type} - {record.record_date.split('T')[0]} - {record.doctor_name} - {record.vet_address} - {record.vet_phone_number} - {record.cost} - {record.record_note}
                                            <button onClick={() => handleDeleteRecord(record.id, pup.id)}>Delete Record</button>
                                        </li>
                                    ))}
                                </ul>
                                <form onSubmit={(e) => handleRecordSubmit(e, pup.id)}>
                                    <input type="text" name="record_type" placeholder="Record Type" value={recordFormData.record_type} onChange={handleRecordChange} required />
                                    <input type="date" name="record_date" value={recordFormData.record_date} onChange={handleRecordChange} required />
                                    <input type="text" name="doctor_name" placeholder="Doctor Name" value={recordFormData.doctor_name} onChange={handleRecordChange} required />
                                    <input type="text" name="vet_address" placeholder="Vet Address" value={recordFormData.vet_address} onChange={handleRecordChange} required />
                                    <input type="text" name="vet_phone_number" placeholder="Vet Phone Number" value={recordFormData.vet_phone_number} onChange={handleRecordChange} required />
                                    <input type="text" name="cost" placeholder="Cost" value={recordFormData.cost} onChange={handleRecordChange} required />
                                    <input type="text" name="record_note" placeholder="Record Note" value={recordFormData.record_note} onChange={handleRecordChange} />
                                    <button type="submit">Add Record</button>
                                </form>
                            </div>
                        )}
                    </ul>
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

export default Pup;
