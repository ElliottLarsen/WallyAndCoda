import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [loginData, setloginData] = useState({ username: "", password: "" });
    const navigateTo = useNavigate();

    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setloginData(currData => {
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
                navigateTo("/user")
            })
            .catch((e) => {
                console.error("Login error", e.response);
                window.alert("Login Error");
            })
    }

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username: </label>
            <input id="username" type="text" placeholder="username" name="username" value={loginData.username} onChange={handleChange} required />
            <br />
            <label htmlFor="password">Password: </label>
            <input id="password" type="password" placeholder="password" name="password" value={loginData.password} onChange={handleChange} required />
            <br />
            <button type="submit">Login</button>
        </form>
    )
}