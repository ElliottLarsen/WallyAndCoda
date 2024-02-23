// Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => { // Accept setIsLoggedIn as a prop
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout actions
        localStorage.removeItem('token'); // Remove token from local storage
        setIsLoggedIn(false); // Update isLoggedIn state
        // Redirect to login page after logout
        navigate('/');
    }, [navigate, setIsLoggedIn]); // Include setIsLoggedIn as a dependency

    return null; // Since this component only performs actions and redirects, it doesn't need to render anything
};

export default Logout;
