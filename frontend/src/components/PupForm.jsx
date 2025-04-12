import { useState, useEffect } from "react";
import axios from "axios";

import AlertModal from "./AlertModal";
import InputForm from "./InputForm";

const PUP_FORM = [
    { name: "pup_name", label: "Pup Name", type: "text", placeholder: "Pup Name", required: true },
    { name: "pup_sex", label: "Pup Sex", type: "text", placeholder: "Pup Sex", required: true },
    { name: "microchip_number", label: "Microchip Number", type: "text", placeholder: "Microchip Number", required: true },
    { name: "akc_registration_number", label: "AKC Registration Number", type: "text", placeholder: "AKC Registration Number", required: true },
    { name: "akc_registration_name", label: "AKC Registration Name", type: "text", placeholder: "AKC Registration Name", required: false },
];

export default function PupForm({ httpType, updatePups, pup_id, setIsActive, setIsActiveAlert, setAlertMessage }) {
    const getToken = () => localStorage.getItem('token');
    const [formData, setFormData] = useState({
        pup_name: '',
        pup_sex: '',
        microchip_number: '',
        akc_registration_number: '',
        akc_registration_name: ''
    });

    useEffect(() => {
        if (httpType === 'put') {
            fetchPupData(pup_id);
        }
    }, [pup_id]);

    const fetchPupData = async (pup_id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/wallyandcoda/pup/${pup_id}/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const currPup = response.data;
            setFormData({
                pup_name: currPup.pup_name,
                pup_sex: currPup.pup_sex,
                microchip_number: currPup.microchip_number,
                akc_registration_number: currPup.akc_registration_number,
                akc_registration_name: currPup.akc_registration_name
            });
        } catch (error) {
            console.error('Error fetching pup:', error);
        }
    };

    const fetchData = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/wallyandcoda/pup/${pup_id}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        const currPup = response.data;
        return {
            pup_name: currPup.pup_name,
            pup_sex: currPup.pup_sex,
            microchip_number: currPup.microchip_number,
            akc_registration_number: currPup.akc_registration_number,
            akc_registration_name: currPup.akc_registration_name
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (formData) => {
        try {
            if (httpType === 'post') {
                await axios.post('http://127.0.0.1:8000/wallyandcoda/pup/', formData, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
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
                setAlertMessage(`${formData.pup_name} added!`);
                setIsActiveAlert(true);
                // alert('Pup added!')
            } else {
                await axios.put(`http://127.0.0.1:8000/wallyandcoda/pup/${pup_id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                
                setAlertMessage(`${formData.pup_name} updated succesfully!`);
                setIsActiveAlert(true);
                
                // alert('Pup updated successfully!');
            }
            updatePups();
            setIsActive('pupDisplay');
        } catch (error) {
            console.error('Error submitting form:', error);
            setAlertMessage('Error submitting form!');
            setIsActiveAlert(true);
        }
    };

    return (
        <>
            <InputForm
                initialData={formData}
                httpType={httpType}
                fetchData={(httpType === 'put') ? fetchData : null}
                onSubmit={handleSubmit}
                onCancel={() => setIsActive('pupDisplay')}
                formFields={PUP_FORM}
                title={(httpType === 'post') ? 'Add Pup' : 'Edit Pup'}
            />
        </>
    );
}