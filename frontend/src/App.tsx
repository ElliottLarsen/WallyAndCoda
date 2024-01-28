import './App.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Welcome from './components/Welcome.jsx';
import User from './components/User.jsx';
import Pup from './components/Pup.jsx';
import Vet from './components/Vet.jsx';
import { Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <nav className="App-nav">
        <Link to='/'>Welcome</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </nav>
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/user' element={<User />} />
      </Routes>
    </>
  );
}

export default App;
