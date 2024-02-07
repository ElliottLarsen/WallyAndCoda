import { useEffect, useState } from 'react';
import axios from 'axios';

export default function User() {
    const [userData, setUserData] = useState({ first_name: "", last_name: "", username: "", email: "", id: "" });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get("http://127.0.0.1:8000/wallyandcoda/user/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((e) => {
                    console.error("Error fetching user data: ", e);
                })
        }
    }, [])

    return (
        <>
            {userData ? (
                <>
                    <h2>Welcome, {userData.username}!</h2>
                    <p>
                        First Name: {userData.first_name}
                        Last Name: {userData.last_name}
                        Username: {userData.username}
                        Email: {userData.email}
                        ID: {userData.id}
                    </p>
                </>
            ) : (
                <p>Loading User Data...</p>
            )}
        </>
    )
}