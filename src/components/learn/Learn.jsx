import React, { useEffect, useState } from 'react';
import Card from '../../ui/Card'; // Assuming you have a Card component for displaying individual group items
import { getToken } from '../../services/JWTService';
import axios from 'axios';
import './Learn.css';
import { useNavigate } from 'react-router-dom'; // For navigation

export default function Learn() {
    const [groups, setGroups] = useState([]);
    const [progressData, setProgressData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to navigate to different routes

    useEffect(() => {
        // Function to load groups
        async function loadGroups() {
            try {
                const token = getToken();
                const response = await axios.get("https://sambha.in/api/grex/groups", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setGroups(response.data.data); // Assuming 'data' contains array of groups
            } catch (error) {
                setError("An error occurred while fetching groups");
            }
        }

        // Function to load progress data
        async function loadProgressData() {
            try {
                const token = getToken();
                const response = await axios.get("https://sambha.in/api/grex/progress", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProgressData(response.data.data); // Assuming 'data' contains progress
            } catch (error) {
                setError("An error occurred while fetching progress data");
            }
        }

        // First load the groups, then load progress data
        async function loadData() {
            await loadGroups();
            await loadProgressData();
            setLoading(false);
        }

        loadData();
    }, []);

    // Navigate to individual group page
    const handleGroupClick = (groupId) => {
        navigate(`/group/${groupId}`); // Adjust this path based on your route setup
    };

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
            {groups.length === 0 ? (
                <div className="notification is-warning has-text-centered">
                    No flashcard groups available.
                </div>
            ) : (
                <div className="columns is-multiline">
                    {groups.map((group, index) => (
                        <div className="column is-one-quarter" key={index}>
                            <Card 
                                id={group.groupId} 
                                name={group.groupName} // Display group name
                                progress={2 * progressData[group.groupId] || 0} // Progress value for the group
                                onClick={() => handleGroupClick(group.groupId)} // Handle click event to navigate
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
