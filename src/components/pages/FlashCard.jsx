import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../services/JWTService';
import axios from 'axios';

export default function FlashCard() {
    
    const { groupId } = useParams();
    const [groupWords, setGroupWords] = useState([]);
    const [currentProgress, setCurrentProgress] = useState(1);  // Start progress at 1
    const [index, setIndex] = useState(0);
    const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [isPreviousButtonDisabled, setPreviousButtonDisabled] = useState(true);
    const [endIndex, setEndIndex] = useState(0);

    const percentage = (currentProgress) * 100 / (endIndex);

    // Load flashcard data for the groupId
    async function loadFlashCardData() {
        try {
            const token = getToken();
            const response = await axios.get(`https://grexhub.b-cdn.net/api/grex/cdn/flashcard/${groupId}`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const flashcardData = response.data.data;
            setGroupWords(flashcardData.words);
            setEndIndex(flashcardData.words.length);
        } catch (error) {
            console.error('Error fetching flashcard data:', error);
        }
    }

    // Load user progress from API
    async function loadUserProgress() {
        try {
        
            const token = getToken();
            const response = await axios.get(`https://sambha.in/api/grex/progress/${groupId}`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const progressData = response.data.data;
            setCurrentProgress(progressData.currentStatus || 1);  // Default to 1
            setIndex((progressData.currentStatus || 1) - 1);
        } catch (error) {
            console.error('Error fetching user progress:', error);
        }
    }


    // Update user progress in the backend
    async function updateGroupProgressInBackend(newProgress) {
        try {
            const token = getToken();
            await axios.post(`https://sambha.in/api/grex/progress/group/${groupId}/update`, { progress: newProgress }, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Error updating user progress in the backend:', error);
        }
    }

    // Handle the Next button click
    function onClickNext() {
        if (index < endIndex - 1) {
            setIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                if (newIndex + 1 > currentProgress) {
                    const newProgress = currentProgress + 1;
                    setCurrentProgress(newProgress);
                    updateGroupProgressInBackend(newProgress);
                }
                return newIndex;
            });
        }
    }

    // Handle the Previous button click
    function onClickPrevious() {
        if (index > 0) {
            setIndex(prevIndex => prevIndex - 1);
        }
    }

    // Load flashcard data and progress on component mount
    useEffect(() => {
        loadFlashCardData();
        loadUserProgress();
    }, [groupId]);

    // Update button states whenever the index changes
    useEffect(() => {
        setPreviousButtonDisabled(index <= 0);
        setNextButtonDisabled(index >= endIndex - 1);
    }, [index, endIndex]);

    return (
        <div className="container is-widescreen">
            <div className='columns'>
                <div className='column is-one-fifth'></div>
                <div className='column '>
                    <div className="card p-3 m-3">
                        <h1>Group: {groupId} | Progress: {currentProgress}/{endIndex}</h1>
                        <div className="card-image">
                            <p className='is-size-2'>
                                {groupWords.length === 0 ? "Loading words..." : groupWords[index]?.word || "No word found"}
                            </p>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <p className='is-size-5'>
                                    {groupWords.length === 0 
                                      ? "Loading words..." 
                                      : groupWords[index]?.synonyms?.map((synonym) => (
                                          <span key={synonym} className="tag is-warning is-light m-1">{synonym}</span>
                                      )) || "No synonyms available"}
                                </p>
                                <progress className="progress is-success" value={percentage} max="100"></progress>
                            </div>
                        </div>
                        <button className="button is-success is-medium is-fullwidth m-2" onClick={onClickNext} disabled={isNextButtonDisabled}>Next</button>
                        <button className="button is-dark is-medium is-fullwidth m-2" onClick={onClickPrevious} disabled={isPreviousButtonDisabled}>Previous</button>
                    </div>
                </div>
                <div className='column is-one-fifth'></div>
            </div>
        </div>
    );
}
