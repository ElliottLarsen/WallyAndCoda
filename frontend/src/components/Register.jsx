import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

export default function Register() {
    return (
        <form>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" placeholder="username" id="username" required />
            <br />
            <label htmlFor="password1">Password: </label>
            <input type="text" name="password1" placeholder="password1" id="password1" required />
            <br />
            <label htmlFor="password2">Confirm Password: </label>
            <input type="text" name="password2" placeholder="password2" id="password2" required />
            <br />
            <label htmlFor="first_name">First Name: </label>
            <input type="text" name="first_name" placeholder="first_name" id="first_name" required />
            <br />
            <label htmlFor="last_name">Last Name: </label>
            <input type="text" name="last_name" placeholder="last_name" id="last_name" equired />
            <br />
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" placeholder="email" id="email" required />
            <br />
            <button type="submit">Register</button>
        </form>

    )
}