import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getToken } from '../../services/JWTService';
import axios from 'axios';
import { useEffect } from 'react';

export default function Group() {

    const params = useParams();
    const [group, setGroup] = useState([]);
    const [completed, setCompleted] = useState(0);
    const [index, setIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0); 

    const percentage = (completed + 1) * 100 / (endIndex + 1);

    const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [isPreviousButtonDisabled, setPreviousButtonDisabled] = useState(false);

    async function loadWordData() {
        try {
            const token = getToken(); 
            const response = await axios.get(`https://sambha.in/api/grex/group/${params.groupId}`, {
                headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}
            });
            const final_data = response.data.data[0];
            setGroup(final_data);
            setIndex(final_data.groupProgress);
            setCompleted(final_data.groupProgress);
            setEndIndex(final_data.groupWords.length - 1);

            // Set button states initially
            setPreviousButtonDisabled(final_data.groupProgress === 0);
            setNextButtonDisabled(final_data.groupProgress >= final_data.groupWords.length - 1);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { loadWordData(); }, []);

    function onClickNext() {
        if (index < endIndex) {
            setIndex(prevIndex => prevIndex + 1);

            if (index >= completed) {
                setCompleted(prevCompleted => prevCompleted + 1);
                updateGroupProgress();
            }
        }

        // Enable/Disable buttons
        setPreviousButtonDisabled(false);
        setNextButtonDisabled(index + 1 >= endIndex);
    }

    function onClickPrevious() {
        if (index > startIndex) {
            setIndex(prevIndex => prevIndex - 1);
        }

        // Enable/Disable buttons
        setPreviousButtonDisabled(index - 1 <= startIndex);
        setNextButtonDisabled(false);
    }

    async function updateGroupProgress() {
        try {
            const token = getToken();
            await axios.post(`https://sambha.in/api/grex/group/${params.groupId}/update`, {}, {
                headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container is-widescreen">
            <div className='columns'>
                <div className='column is-one-fifth'></div>
                <div className='column '>
                    <div className="card p-3 m-3 ">
                        <h1>{startIndex}:{index}:{endIndex}:{completed}</h1>
                        <div className="card-image">
                            <p className='is-size-2'>
                                {group.length === 0 ? "Loading words..." : group.groupWords[index].word}
                            </p>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <p className='is-size-5'>
                                    {group.length === 0 ? "Loading words..." : group.groupWords[index].synonyms.map((synonym) => (
                                        <span key={synonym} className="tag is-warning is-light m-1">{synonym}</span>
                                    ))}
                                </p>
                                <progress className="progress is-warning" value={percentage} max="100"></progress>
                            </div>
                        </div>
                        <button className="button is-dark is-medium is-fullwidth m-2" onClick={onClickPrevious} disabled={isPreviousButtonDisabled}>Previous</button>
                        <button className="button is-warning is-medium is-fullwidth m-2" onClick={onClickNext} disabled={isNextButtonDisabled}>Next</button>
                    </div>
                </div> 
                <div className='column is-one-fifth'></div>
            </div>
        </div>
    );
}
