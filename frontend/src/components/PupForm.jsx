import { useState, useEffect } from "react";
import axios from "axios";

export default function PupForm({ httpType, updatePups, pup_id, setIsActive }) {
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
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
            alert('Pup added!')
            updatePups();
            setIsActive('pupDisplay');
        } catch (error) {
            console.error('Error adding pup:', error);
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/wallyandcoda/pup/${pup_id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            alert('Pup updated successfully!');
            updatePups();
            setIsActive('pupDisplay');
        } catch (error) {
            console.error("An error occured:", error);
        }
    };

    function handleClick() {
        setIsActive('pupDisplay');
    }

    return (
        <>
            <div className="mini-nav-button">
            <h2>{(httpType === 'post') ? 'Add' : 'Edit'} Pup</h2>
                <button onClick={handleClick}>go back</button>
            </div>
            <form onSubmit={(httpType === 'post') ? handleAddSubmit : handleEditSubmit}>
                <fieldset>
                    <label htmlFor="pup_name">Pup name </label>
                    <input
                        type="text"
                        name="pup_name"
                        placeholder="Pup Name"
                        value={formData.pup_name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="pup_sex">Pup sex </label>
                    <input
                        type="text"
                        name="pup_sex"
                        placeholder="Pup sex"
                        value={formData.pup_sex}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="microchip_number">Microchip Number </label>
                    <input
                        type="text"
                        name="microchip_number"
                        placeholder="Microchip Number"
                        value={formData.microchip_number}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="akc_registration_number">AKC Registration Number </label>
                    <input
                        type="text"
                        name="akc_registration_number"
                        placeholder="AKC Registration Number"
                        value={formData.akc_registration_number}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="akc_registration_name">AKC Registration Name </label>
                    <input
                        type="text"
                        name="akc_registration_name"
                        placeholder="AKC Registration Name"
                        value={formData.akc_registration_name}
                        onChange={handleChange}
                    />
                    <button type="submit">{(httpType === 'post') ? 'Add' : 'Save'}</button>
                </fieldset>
            </form>
        </>
    );
}