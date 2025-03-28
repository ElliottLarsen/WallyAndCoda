import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AddPupRecord({choosenPup}) {
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecordFormData({
            ...recordFormData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:8000/wallyandcoda/pup/record/${choosenPup}`, {
                ...recordFormData,
                cost: parseFloat(recordFormData.cost) // Convert cost to float
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
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
            // navigate back to pup? 
            // Fetch records again to update UI
            // fetchRecords(selectedPup);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    return (
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
                <button type="submit">Add Record</button>
            </fieldset>
        </form>
    );
}