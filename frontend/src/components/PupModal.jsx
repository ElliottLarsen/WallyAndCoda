import { useRef, useEffect } from "react";

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

    return (
        <dialog onClose={handleClose} ref={dialog}>
            <h2>{currentPup.pup_name}</h2>
            <p>Sex: {currentPup.pup_sex}</p>
            <p>Microchip Number: {currentPup.microchip_number}</p>
            <p>AKC Registration Number: {currentPup.akc_registration_number}</p>
            <p>AKC Registration Name: {currentPup.akc_registration_name}</p>
            <form method='dialog'>
                <button onClick={handleClose}>Close</button>
            </form>
        </dialog>
    );
}