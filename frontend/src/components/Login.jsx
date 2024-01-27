import { useState } from "react";

export default function Login() {

    const [loginData, setloginData] = useState({username: "", password: ""});
    
    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setloginData(currData => {
            currData[changedField] = newValue;
            return{...currData};
        })
    }

    const handleLogin = () => {
        console.log(loginData);
    }

    return (
        <div>
            <p>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" placeholder="username" name="username" value={loginData.username} onChange={handleChange} required />
            </p>
            <p>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" placeholder="password" name="password" value={loginData.password} onChange={handleChange} required />
            </p>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}