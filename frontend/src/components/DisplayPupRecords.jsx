import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditPupRecord from './EditPupRecord';

export default function DisplayPupRecords({ records, handleDelete }) {
    const [isActive, setIsActive] = useState('pupDisplay');

    if (records.length === 0) {
        return <p>No records yet!</p>;
    }

    const handleEditClick = () => {
        setIsActive('editRecord')
        return 
    }

    return (
        <>
        
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Vet Address</th>
                        <th>Vet Number</th>
                        <th>Cost</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={record.id}>
                            <td>{record.record_type}</td>
                            <td>{record.record_date.split('T')[0]}</td>
                            <td>Dr. {record.doctor_name}</td>
                            <td>{record.vet_address}</td>
                            <td>{record.vet_phone_number}</td>
                            <td>${record.cost}</td>
                            <td>{record.record_note}</td>
                            <td>
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick()} />
                                <FontAwesomeIcon className='trash' icon={faTrash} onClick={() => handleDelete(record.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}