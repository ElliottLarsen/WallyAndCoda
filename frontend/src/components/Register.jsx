import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

export default function Register() {

    const [registerData, setRegisterData] = useState({ username: "", password1: "", password2: "", first_name: "", last_name: "", email: "" })
    const navigateTo = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post("http://127.0.0.1:8000/wallyandcoda/user/register", registerData)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigateTo("/login")
            })
            .catch((e) => {
                console.error("Error during registration: ", e);
            })
    }

    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setRegisterData(currData => {
            currData[changedField] = newValue;
            return { ...currData };
        })
    }
    if (registerData) {
        <Login />
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" placeholder="username" id="username" onChange={handleChange} required />
            <br />
            <label htmlFor="password1">Password: </label>
            <input type="text" name="password1" placeholder="password1" id="password1" onChange={handleChange} required />
            <br />
            <label htmlFor="password2">Confirm Password: </label>
            <input type="text" name="password2" placeholder="password2" id="password2" onChange={handleChange} required />
            <br />
            <label htmlFor="first_name">First Name: </label>
            <input type="text" name="first_name" placeholder="first_name" id="first_name" onChange={handleChange} required />
            <br />
            <label htmlFor="last_name">Last Name: </label>
            <input type="text" name="last_name" placeholder="last_name" id="last_name" onChange={handleChange} required />
            <br />
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" placeholder="email" id="email" onChange={handleChange} required />
            <br />
            <button type="submit">Register</button>
        </form>

    )
}