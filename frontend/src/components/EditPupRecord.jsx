import { useState } from "react";

export default function EditPupRecord({ record, setIsActive }) {
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.put(`http://127.0.0.1:8000/wallyandcoda/pup/record/${record.id}`, recordFormData, {
                ...recordFormData,
                cost: parseFloat(recordFormData.cost) // Convert cost to float
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setIsActive('pupDisplay');
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    return (
        <>
            <div className="mini-nav-button">
                <button onClick={handleClick}>go back</button>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="record_type">Record Type: </label>
                    <input
                        type="text"
                        name="record_type"
                        placeholder="Record Type"
                        value={record.record_type}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="record_date">Record Date: </label>
                    <input
                        type="date"
                        name="record_date"
                        value={record.record_date}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="doctor_name">Doctor: </label>
                    <input
                        type="text"
                        name="doctor_name"
                        placeholder="Doctor Name"
                        value={record.doctor_name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="vet_address">Address: </label>
                    <input
                        type="text"
                        name="vet_address"
                        placeholder="Vet Address"
                        value={record.vet_address}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="vet_phone_number">Phone Number: </label>
                    <input
                        type="text"
                        name="vet_phone_number"
                        placeholder="Vet Phone Number"
                        value={record.vet_phone_number}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="cost">Cost: </label>
                    <input
                        type="text"
                        name="cost"
                        placeholder="Cost"
                        value={record.cost}
                        onChange={handleChange}
                        required />
                    <label htmlFor="record_note">Note: </label>
                    <input
                        type="text"
                        name="record_note"
                        placeholder="Record Note"
                        value={record.record_note}
                        onChange={handleChange}
                    />
                    <button type="submit">Add Record</button>
                </fieldset>
            </form>
        </>
    );
}