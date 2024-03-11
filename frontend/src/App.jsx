// App.jsx
import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import Pup from './components/Pup';
import Logout from './components/Logout'; // Import the Logout component
import MyPups from './components/MyPups';
import PupRecords from './components/PupRecords';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially, the user is not logged in

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions such as clearing local storage, resetting state, etc.
    localStorage.removeItem('token'); // Remove token from local storage
    setIsLoggedIn(false); // Update isLoggedIn state
  };

  return (
    <>
      <header>
        <div>
          <h1>Wally & Coda</h1>
        </div>
        <div>
      <nav className="App-nav">
        {/* Conditional rendering based on the authentication state */}
        {isLoggedIn ? (
          <>
            <Link to='/user'>Account</Link>
            <Link to='/pup'>Pup Records</Link>
            <Link to='/my_pups'>My Pups</Link>
            <Link to='/logout'>Logout</Link> {/* Update to link to the logout route */}
          </>
        ) : (
          <>
            <Link to='/'>Welcome</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </>
        )}
      </nav>
      </div>
      </header>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn to Login component */}
        <Route path='/user' element={<User />} />
        <Route path='/pup' element={<PupRecords />} />
        <Route path='/my_pups' element={<MyPups />} />
        <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn to Logout component */}
      </Routes>
      <footer>
        <p>&copy;2024 ELD</p>
      </footer>
    </>
  );
}

export default App;
