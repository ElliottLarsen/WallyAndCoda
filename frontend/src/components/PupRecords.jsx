import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AlertModal from './AlertModal';
import DeleteConfirmation from './DeleteConfirmation';
import PupRecordForm from './PupRecordForm';
import DisplayPupRecords from './DisplayPupRecords';
import ContentCard from './ContentCard';
import PupDropdown from './PupDropdown';

const PupRecords = () => {
    const navigateTo = useNavigate();
    const [pups, setPups] = useState([]);
    const [selectedPup, setSelectedPup] = useState('');
    const [records, setRecords] = useState([]);
    const [recordId, setRecordId] = useState();

    const [isActiveAlert, setIsActiveAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [activeDelete, setIsActiveDelete] = useState(false);
    const [activeModal, setActiveModal] = useState(false);

    const [isActive, setIsActive] = useState('pupDisplay');

    useEffect(() => {
        if (isActive === 'pupDisplay') {
            fetchPups();
        }
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

    const closeAlertModal = () => {
        setIsActiveAlert(false);
    }

    function openDeleteModal() {
        setIsActiveDelete(true);
    }

    const closeDeleteModal = () => {
        setIsActiveDelete(false);
        setIsActive('pupDisplay');
    }

    let pupDropdown = (
        <PupDropdown pups={pups} selectPup={selectedPup} handleChange={handlePupChange} />

    );

    return (
        <div className='container'>
            {(isActive === 'pupDisplay') ? (
                <>
                    <div>
                        <button
                            className='add-button'
                            onClick={() => handleClick('addRecord')}
                        >
                            + new record
                        </button>
                    </div>
                    <ContentCard className={'pup-dropdown'} content={pupDropdown} />
                    <DisplayPupRecords
                        records={records}
                        handleDelete={handleDeleteRecord}
                        setIsActive={setIsActive}
                        setRecordId={setRecordId}
                        activeDelete={activeDelete}
                        openDelete={openDeleteModal}
                        closeDelete={closeDeleteModal}
                    />

                </>
            ) : (
                <div>
                    <PupRecordForm
                        choosenPup={selectedPup}
                        httpType={isActive === 'addRecord' ? 'post' : 'put'}
                        updateRecords={fetchRecords}
                        record_id={isActive === 'editRecord' ? recordId : null}
                        setIsActive={setIsActive}
                        setIsActiveAlert={setIsActiveAlert}
                        setAlertMessage={setAlertMessage}
                    />
                </div>
            )}
            {isActiveAlert && <AlertModal close={closeAlertModal} content={alertMessage} modalStyle={'pup-modal'} />}
        </div>
    );
};

export default PupRecords;
