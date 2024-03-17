import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Login({ setIsLoggedIn }) { // Accept setIsLoggedIn as a prop
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const navigateTo = useNavigate();

    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setLoginData(currData => {
            currData[changedField] = newValue;
            return { ...currData };
        })
    }

    const handleLogin = (evt) => {
        evt.preventDefault()
        const params = new URLSearchParams();
        params.append("username", loginData.username);
        params.append("password", loginData.password);
        axios.post("http://127.0.0.1:8000/wallyandcoda/user/login", params)
            .then((res) => {
                localStorage.setItem("token", res.data.access_token);
                setIsLoggedIn(true); // Update isLoggedIn state to true
                navigateTo("/");
            })
            .catch((e) => {
                console.error("Login error", e.response);
                window.alert("Login Error");
            })
    }

    return (
        <>
            <div className='flex-container'>
                <div className='square brown'>
                    <hr />
                    <h1>Login</h1>
                    <hr />
                </div>
                <div className='square white'>
                    <form onSubmit={handleLogin}>
                        <fieldset>
                        <label htmlFor="username">Username: </label>
                        <input id="username" type="text" placeholder="username" name="username" value={loginData.username} onChange={handleChange} required />
                        
                        <label htmlFor="password">Password: </label>
                        <input id="password" type="password" placeholder="password" name="password" value={loginData.password} onChange={handleChange} required />
                        <br></br>
                        <button type="submit">Login</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}
