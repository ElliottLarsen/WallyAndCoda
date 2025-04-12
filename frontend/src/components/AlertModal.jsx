import { useRef, useEffect } from "react";
import { createPortal } from 'react-dom';

export default function AlertModal({ close, content }) {
    const dialog = useRef();

    useEffect(() => {
        if (dialog.current) {
            dialog.current.showModal();
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            close();
        }, 1500);
        return () => {
            clearTimeout(timer);
        }
    }, [])

    const handleClose = () => {
        dialog.current.close();
        if (close) close();
    };

    return createPortal(
        <dialog onClose={handleClose} ref={dialog} className="pup-modal">
            <div style={{textAlign: 'center'}}>{content}</div>
            {/* <form method='dialog'>
                <button className="exit-button" onClick={handleClose}>Close</button>
            </form> */}
        </dialog>,
        document.getElementById('modal')
    );
}