import React, { useEffect, useState } from 'react';
import Card from '../../ui/Card'; // Assuming you have a Card component for displaying individual progress items
import { getToken } from '../../services/JWTService';
import axios from 'axios';
import './Learn.css';

export default function Learn() {
    const [progressData, setProgressData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProgressDataforUser() {
            try {
                const token = getToken();
                const response = await axios.get("http://localhost:8080/api/grex/progress", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProgressData(response.data);
            } catch (error) {
                setError("An error occurred while fetching data");
            } finally {
                setLoading(false);
            }
        }

        loadProgressDataforUser();
    }, []);

    if (loading) {
        return (
            <div className="container is-flex is-justify-content-center is-align-items-center">
                <div className="notification is-info has-text-centered">
                    Loading flashcards...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container is-flex is-justify-content-center is-align-items-center">
                <div className="notification is-danger has-text-centered">
                    {error}
                </div>
            </div>
        );
    }

    // Dynamically get all group progress values
    const groupKeys = Object.keys(progressData).filter(key => key.startsWith('g'));

    return (
        <div className="container mt-5">
            <h1 className="title has-text-centered">Learn English with Flashcards</h1>
            {groupKeys.length === 0 ? (
                <div className="notification is-warning has-text-centered">
                    No flashcard groups available.
                </div>
            ) : (
                <div className="columns is-multiline">
                    {groupKeys.map((groupKey, index) => (
                        <div className="column is-one-quarter" key={index}>
                            <Card 
                                id={groupKey} 
                                name={groupKey} // Group key like g1, g2, etc.
                                progress={progressData[groupKey]} // Progress value for the group
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
