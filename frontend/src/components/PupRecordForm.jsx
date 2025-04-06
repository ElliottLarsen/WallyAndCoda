import { useState, useEffect } from "react";
import axios from "axios";

export default function PupRecordForm({ choosenPup, httpType, record_id, updateRecords, setIsActive }) {
    const getToken = () => localStorage.getItem('token');
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
        if (httpType === 'put') {
            fetchPupRecordData(record_id);
        }
    }, [record_id]);

    const fetchPupRecordData = async (record_id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/wallyandcoda/pup/record/${record_id}/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const currRecord = response.data;
            setRecordFormData({
                record_type: currRecord.record_type,
                record_date: currRecord.record_date.split('T')[0],
                doctor_name: currRecord.doctor_name,
                vet_address: currRecord.vet_address,
                vet_phone_number: currRecord.vet_phone_number,
                cost: currRecord.cost,
                record_note: currRecord.record_note
            });
        } catch (error) {
            console.error('Error fetching record', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (httpType === 'post') {
                await axios.post(`http://127.0.0.1:8000/wallyandcoda/pup/record/${choosenPup}`,
                    { ...recordFormData, cost: parseFloat(recordFormData.cost) },// Convert cost to float
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    }
                );
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
            } else {
                await axios.put(`http://127.0.0.1:8000/wallyandcoda/pup/record/${record_id}`,
                    recordFormData,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    }
                );
                fetchPupRecordData(record_id);
            }
            updateRecords(choosenPup);
            setIsActive('pupDisplay');
        } catch (error) {
            console.error('Error submitting record:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecordFormData({
            ...recordFormData,
            [name]: value
        });
    };

    const handleClick = () => {
        setIsActive('pupDisplay');
    }

    return (
        <>
            <div className="mini-nav-button">
                <h2>{(httpType === 'post') ? 'Add' : 'Edit'} Record</h2>
                <button onClick={handleClick}>go back</button>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="record_type">Record Type: </label>
                    <input
                        type="text"
                        name="record_type"
                        placeholder="Record Type"
                        value={recordFormData.record_type}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="record_date">Record Date: </label>
                    <input
                        type="date"
                        name="record_date"
                        value={recordFormData.record_date}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="doctor_name">Doctor: </label>
                    <input
                        type="text"
                        name="doctor_name"
                        placeholder="Doctor Name"
                        value={recordFormData.doctor_name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="vet_address">Address: </label>
                    <input
                        type="text"
                        name="vet_address"
                        placeholder="Vet Address"
                        value={recordFormData.vet_address}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="vet_phone_number">Phone Number: </label>
                    <input
                        type="text"
                        name="vet_phone_number"
                        placeholder="Vet Phone Number"
                        value={recordFormData.vet_phone_number}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="cost">Cost: </label>
                    <input
                        type="text"
                        name="cost"
                        placeholder="Cost"
                        value={recordFormData.cost}
                        onChange={handleChange}
                        required />
                    <label htmlFor="record_note">Note: </label>
                    <input
                        type="text"
                        name="record_note"
                        placeholder="Record Note"
                        value={recordFormData.record_note}
                        onChange={handleChange}
                    />
                    <button type="submit">{(httpType === 'post') ? 'Add' : 'Save'}</button>
                </fieldset>
            </form>
        </>
    );
}