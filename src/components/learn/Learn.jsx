import React, { useEffect, useState } from 'react';
import Card from '../../ui/Card';
import { getToken } from '../../services/JWTService';
import axios from 'axios';
import './Learn.css';

export default function Learn() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProgressDataforUser() {
            try {
                const token = getToken();
                const response = await axios.get("https://sambha.in/api/grex/group", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.data.code === 200) {
                    setGroups(response.data.data);
                } else {
                    setError("Failed to load data");
                }
            } catch (error) {
                setError("An error occurred while fetching data");
            } finally {
                setLoading(false);
            }
        }

        loadProgressDataforUser();
    }, []);

    // Organizing cards into chunks for rows
    const chunkSize = 4; // Adjusted to 4 cards per row for better UI on various screens
    const chunkedArray = [];
    for (let i = 0; i < groups.length; i += chunkSize) {
        chunkedArray.push(groups.slice(i, i + chunkSize));
    }

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

    return (
        <div className="container mt-5">
            <h1 className="title has-text-centered">Learn English with Flashcards</h1>
            {chunkedArray.length === 0 ? (
                <div className="notification is-warning has-text-centered">
                    No flashcard groups available.
                </div>
            ) : (
                chunkedArray.map((chunk, rowIndex) => (
                    <div className="columns is-multiline" key={rowIndex}>
                        {chunk.map((group, colIndex) => (
                            <div className="column is-one-quarter" key={colIndex}>
                                <Card id={group.groupId} name={group.groupName} progress={group.groupProgress} />
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}
