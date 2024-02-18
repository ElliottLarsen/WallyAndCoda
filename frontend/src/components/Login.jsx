import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    return (
        <form>
            <label htmlFor="username">Username: </label>
            <input id="username" type="text" placeholder="username" name="username" required />
            <br />
            <label htmlFor="password">Password: </label>
            <input id="password" type="password" placeholder="password" name="password" required />
            <br />
            <button type="submit">Login</button>
        </form>
    )
}