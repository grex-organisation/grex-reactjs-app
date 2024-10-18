import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../services/JWTService';
import axios from 'axios';

export default function FlashCard() {
    const { groupId } = useParams();
    const [groupWords, setGroupWords] = useState([]);  // Stores flashcard data (words)
    const [currentProgress, setCurrentProgress] = useState(0);  // Stores current user progress
    const [index, setIndex] = useState(0);  // Index for tracking which word to show
    const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [isPreviousButtonDisabled, setPreviousButtonDisabled] = useState(true);
    const [endIndex, setEndIndex] = useState(0);  // The max index based on group words length

    // Calculate the completion percentage
    const percentage = (currentProgress + 1) * 100 / (endIndex + 1);

    // Load flashcard data for the groupId
    async function loadFlashCardData() {
        try {
            const token = getToken();
            const response = await axios.get(`https://sambha.in/api/grex/flashcard/${groupId}`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const flashcardData = response.data.data;
            setGroupWords(flashcardData.words);  // Set the words for this group
            setEndIndex(flashcardData.words.length - 1);  // Set the end index based on words length
        } catch (error) {
            console.error('Error fetching flashcard data:', error);
        }
    }

    // Load user progress for the groupId
    async function loadUserProgress() {
        try {
            const token = getToken();
            const response = await axios.get(`https://sambha.in/api/grex/progress/${groupId}`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const progressData = response.data.data;
            setCurrentProgress(progressData.currentStatus);
            setIndex(progressData.currentStatus);
        } catch (error) {
            console.error('Error fetching user progress:', error);
        }
    }

    // Update user progress in the backend
    async function updateGroupProgress() {
        try {
            const token = getToken();
            await axios.post(`https://sambha.in/api/grex/progress/group/${groupId}/update`, {}, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Error updating user progress:', error);
        }
    }

    // Update button states based on the current index
    function updateButtonStates(newIndex) {
        setPreviousButtonDisabled(newIndex <= 0);
        setNextButtonDisabled(newIndex >= endIndex);
    }

    // Load both flashcard data and progress when the component mounts
    useEffect(() => {
        loadFlashCardData();
        loadUserProgress();
    }, [groupId]);

    // Update the button states whenever the index changes
    useEffect(() => {
        updateButtonStates(index);
    }, [index, endIndex]);

    // Handle the Next button click
    function onClickNext() {
        if (index < endIndex) {
            setIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                if (newIndex > currentProgress) {
                    setCurrentProgress(prevProgress => prevProgress + 1);
                    updateGroupProgress();
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
