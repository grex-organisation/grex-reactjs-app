import React, { useEffect, useState } from 'react';
import { getToken } from '../../services/JWTService';
import axios from 'axios';
import icon_next from '../../assets/icons/next.png';
import icon_reset from '../../assets/icons/reset.png';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar';
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
                

                // make API call
                const token = getToken();
                const response = await axios.get("https://sambha.in/api/grex/groups", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = response.data.data;
                setGroups(data);

            } catch (error) {
                setError("An error occurred while fetching groups");
            }
        }

        // Function to load progress data
        async function loadProgressData() {
            try {
        
                // make API call
                const token = getToken();
                const response = await axios.get("https://sambha.in/api/grex/progress", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = response.data.data;
                setProgressData(data);

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
        navigate(`/learn/group/${groupId}`); // Adjust this path based on your route setup
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
            {groups.length === 0 ? (
                <div className="notification is-warning has-text-centered">
                    No Groups available.
                </div>
            ) : (
                <div className="table-container">
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th><abbr title="Group Name">Group Name</abbr></th>
                                <th><abbr title="Group Id">Group Id</abbr></th>
                                <th><abbr title="Progress">Progress</abbr></th>
                                <th><abbr title=""></abbr></th>
                                <th><abbr title=""></abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group, index) => (
                                <tr key={index} onClick={() => handleGroupClick(group.groupId)}>
                                    <td>{group.groupName}</td>
                                    <td>{group.groupId}</td>
                                    <td><ProgressBar progress={progressData[group.groupId] || 0} /></td>
                                    <td>{progressData[group.groupId]} / 50</td>
                                    <td>
                                        <Link>
                                            <span className="is-flex is-align-items-center">
                                                <img onClick={() => handleGroupClick(group.groupId)} className="m-2" src={icon_next} alt="Continue Icon" style={{ height: '36px', width: '36px' }} />
                                                <img className="m-2" src={icon_reset} alt="Reset Icon" style={{ height: '36px', width: '36px' }} />
                                            </span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
