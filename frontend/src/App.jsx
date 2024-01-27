import './App.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import User from './components/User.jsx';
import Pup from './components/Pup.jsx';
import Vet from './components/Vet.jsx';
import { Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <nav className="App-nav">
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </nav>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
