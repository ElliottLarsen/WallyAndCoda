import { useRef, useEffect } from "react";
import { createPortal } from 'react-dom';

export default function PupModal({ close, currentPup }) {
    const dialog = useRef();

    useEffect(() => {
        if (dialog.current) {
            dialog.current.showModal();
        }
    }, []);

    const handleClose = () => {
        dialog.current.close();
        if (close) close();
    };

    if (!currentPup) {
        return null;
    }

    return createPortal(
        <dialog onClose={handleClose} ref={dialog} className="pup-modal">
            <h2>{currentPup.pup_name}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Sex:</th>
                        <td>{currentPup.pup_sex}</td>
                    </tr>
                    <tr>
                        <th>Microchip Number:</th>
                        <td>{currentPup.microchip_number}</td>
                    </tr>
                    <tr>
                        <th>AKC Registration Number:</th>
                        <td>{currentPup.akc_registration_number}</td>
                    </tr>
                    <tr>
                        <th>AKC Registration Name:</th>
                        <td>{currentPup.akc_registration_name}</td>
                    </tr>
                </tbody>
            </table>
            <form method='dialog'>
                <button className="exit-button" onClick={handleClose}>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}