import { useLocation, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
    // const location = useLocation();
    // const userFromLocationState = location.state?.user;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setUser(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsLoading(false);
            }
        };

        if (!user && token) {
            fetchUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    // const baseUrl = 'http://127.0.0.1:8000';
    return (
        <div className="profile">
            <div className="profile-background"> </div>
            <div className="profile-container">
                <div className="profile-image">
                    <img src={`${user.avatar}`} alt="Profile" className="rounded-circle w-10" />
                </div>
                <div className="profile-header pt-5">
                    <h2 className="profile-username">{user.username} Profile</h2>
                    <p className="profile-email">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </p>
                    <hr className="mt-4" />
                </div>
                <div className="profile-details">
                    <p className="profile-info">
                        <strong className="profile-username">Username:</strong> {user.username}
                    </p>

                    <p className="profile-info">
                        <strong className="profile-username">Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
                    </p>
                    <p className="profile-info">
                        <strong className="profile-username">Phone:</strong> {user.mobile}
                    </p>
                    <p className="profile-info">
                        <strong className="profile-username">Date of Birth:</strong> {user.dob}
                    </p>
                    <p className="profile-info">
                        <strong className="profile-username">Address:</strong> {user.address}
                    </p>
                    <p className="profile-info">
                        <strong className="profile-username">City:</strong> {user.city}
                    </p>
                    <p className="profile-info">
                        <strong className="profile-username">Country:</strong> {user.country}
                    </p>
                </div>
            </div>
        </div>

    );
}