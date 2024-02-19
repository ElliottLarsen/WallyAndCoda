import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

export default function Login() {

    return (
        <>
            <div className='flex-container'>
                <div className='square brown'>
                    <hr/>
                    <h1>Login</h1>
                    <hr/>
                </div>
                <div className='square white'>
                    <form>
                        <label htmlFor="username">Username: </label>
                        <input id="username" type="text" placeholder="username" name="username" required />
                        <br />
                        <label htmlFor="password">Password: </label>
                        <input id="password" type="password" placeholder="password" name="password" required />
                        <br />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}