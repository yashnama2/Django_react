import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username, password
            });
            const userData = response.data;
            const id = userData['user']['id'];
            const token = userData['token'];
            localStorage.setItem('userId', id);
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(userData));
            navigate('/blog');
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response ? error.response.data.detail : "Login failed!");
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (userId && token) {
            navigate('/blog');
        }
    }, []);

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form bg-white px-4 py-5 rounded-4 shadow">
                <h2>Sign In</h2>
                <div className="input-group mb-3 mt-4">
                    <label className='mb-1' htmlFor="username">Username</label>
                    <input
                        type='text'
                        className='w-100 p-2 rounded-1 mb-1 border'
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <label className='mb-1' htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className='w-100 p-2 rounded-1 mb-1 border pe-4'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button type="submit">Sign in</button>
                <div className='mt-3 text-start'>
                    {<p className='text-danger'>{error}</p>}
                </div>

            </form>
        </div>
    )
}