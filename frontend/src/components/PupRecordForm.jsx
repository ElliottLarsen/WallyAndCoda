import { useState, useEffect } from "react";
import axios from "axios";

import InputForm from "./InputForm";

const PUP_RECORD_FORM = [
    { name: "record_type", label: "Record Type", type: "text", placeholder: "Record Type", required: true },
    { name: "record_date", label: "Record Date", type: "date", placeholder: "", required: true },
    { name: "doctor_name", label: "Doctor", type: "text", placeholder: "Doctor Name", required: true },
    { name: "vet_address", label: "Address", type: "text", placeholder: "Vet Address", required: true },
    { name: "vet_phone_number", label: "Phone Number", type: "text", placeholder: "Vet Phone Number", required: true },
    { name: "cost", label: "Cost", type: "text", placeholder: "Cost", required: true },
    { name: "record_note", label: "Note", type: "text", placeholder: "Record Note", required: false },
];

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
            fetchPupRecordData();
        }
    }, [record_id]);

    const fetchPupRecordData = async () => {
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

    const fetchData = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/wallyandcoda/pup/record/${record_id}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        const currRecord = response.data;
        return {
            record_type: currRecord.record_type,
            record_date: currRecord.record_date.split('T')[0],
            doctor_name: currRecord.doctor_name,
            vet_address: currRecord.vet_address,
            vet_phone_number: currRecord.vet_phone_number,
            cost: currRecord.cost,
            record_note: currRecord.record_note
        }
    };

    const handleSubmit = async (recordFormData) => {
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
                alert("Record added!");
            } else {
                await axios.put(`http://127.0.0.1:8000/wallyandcoda/pup/record/${record_id}`,
                    recordFormData,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    }
                );
                fetchPupRecordData();
                alert('Record saved!');
            }
            updateRecords(choosenPup);
            setIsActive('pupDisplay');
        } catch (error) {
            console.error('Error submitting record:', error);
        }
    };

    return (
        <>
            <InputForm
                initialData={recordFormData}
                httpType={httpType}
                fetchData={(httpType === 'put') ? fetchData : null}
                onSubmit={handleSubmit}
                onCancel={() => setIsActive('pupDisplay')}
                formFields={PUP_RECORD_FORM}
                title={(httpType === 'post') ? 'Add Record' : 'Edit Record'}
            />
        </>
    );
}