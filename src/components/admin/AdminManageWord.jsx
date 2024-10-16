import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../services/JWTService';

export default function AdminManageWord() {
    const [words, setWords] = useState([]);
    const [formData, setFormData] = useState({
        wordId: "",
        groupId: "",
        word: "",
        meaning: "",
        examples: [],
        synonyms: []
    });
    const [example, setExample] = useState("");
    const [synonym, setSynonym] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [wordToDelete, setWordToDelete] = useState(null);

    useEffect(() => {
        loadWordData();
    }, []);

    useEffect(() => {
        validateForm();
    }, [formData]);

    async function loadWordData() {
        try {
            const token = getToken();
            const response = await axios.get("http://localhost:8080/api/grex/admin/words", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setWords(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    function validateForm() {
        const { wordId, groupId, word, meaning, examples, synonyms } = formData;
        setIsFormValid(
            wordId.trim() !== "" &&
            groupId.trim() !== "" &&
            word.trim() !== "" &&
            meaning.trim() !== "" &&
            examples.length > 0 &&
            synonyms.length > 0
        );
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trim()
        });
    }

    function addExample() {
        if (example.trim() !== "") {
            setFormData(prevState => ({
                ...prevState,
                examples: [...prevState.examples, example.trim()]
            }));
            setExample("");
        }
    }

    function addSynonym() {
        if (synonym.trim() !== "") {
            setFormData(prevState => ({
                ...prevState,
                synonyms: [...prevState.synonyms, synonym.trim()]
            }));
            setSynonym("");
        }
    }

    async function saveWord() {
        try {
            const token = getToken();
            const requestPayload = JSON.stringify({
                wordId: formData.wordId,
                wordJSON: {
                    word: formData.word,
                    groupId: formData.groupId,
                    meaning: formData.meaning,
                    examples: formData.examples,
                    synonyms: formData.synonyms
                },
                groupId: formData.groupId
            });

            if (isEditMode) {
                // Update existing word
                const response = await axios.put(`http://localhost:8080/api/grex/admin/words/${formData.wordId}`, requestPayload, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.code === 200) {
                    loadWordData();
                }
            } else {
                // Create new word
                const response = await axios.post("http://localhost:8080/api/grex/admin/words/add", requestPayload, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.code === 200) {
                    loadWordData();
                }
            }

            // Reset the form after saving
            setFormData({
                wordId: "",
                groupId: "",
                word: "",
                meaning: "",
                examples: [],
                synonyms: []
            });
            setIsEditMode(false);
        } catch (error) {
            console.error(error);
        }
    }

    function confirmDeleteWord(wordId) {
        setWordToDelete(wordId);
        setShowConfirmation(true);
    }

    async function deleteWord() {
        try {
            const token = getToken();
            const response = await axios.delete(`http://localhost:8080/api/grex/admin/words/${wordToDelete}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.code === 200) {
                loadWordData();
            }
        } catch (error) {
            console.error(error);
        }
        setShowConfirmation(false);
        setWordToDelete(null);
    }

    function editWord(item) {
        setFormData({
            wordId: item.wordId,
            groupId: item.groupId,
            word: item.wordJSON.word,
            meaning: item.wordJSON.meaning,
            examples: item.wordJSON.examples,
            synonyms: item.wordJSON.synonyms
        });
        setIsEditMode(true);
    }

    function cancelEdit() {
        setFormData({
            wordId: "",
            groupId: "",
            word: "",
            meaning: "",
            examples: [],
            synonyms: []
        });
        setIsEditMode(false);
    }

    return (
        <div className="container mt-5">
            <div className="box p-5 has-background-light">
                <h1 className="title has-text-centered">Manage Words</h1>

                <div className="columns is-multiline">
                    <div className="column is-half">
                        <label className="label">Word ID</label>
                        <input className="input" type="text" placeholder="Enter word ID" name="wordId" value={formData.wordId} onChange={handleChange} disabled={isEditMode} />
                    </div>
                    <div className="column is-half">
                        <label className="label">Group ID</label>
                        <input className="input" type="text" placeholder="Enter group ID" name="groupId" value={formData.groupId} onChange={handleChange} />
                    </div>
                    <div className="column is-half">
                        <label className="label">Word</label>
                        <input className="input" type="text" placeholder="Enter word" name="word" value={formData.word} onChange={handleChange} />
                    </div>
                    <div className="column is-half">
                        <label className="label">Meaning</label>
                        <input className="input" type="text" placeholder="Enter word meaning" name="meaning" value={formData.meaning} onChange={handleChange} />
                    </div>
                    <div className="column is-half">
                        <label className="label">Examples</label>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="Add example" value={example} onChange={(e) => setExample(e.target.value)} />
                            </div>
                            <div className="control">
                                <button className="button is-primary" onClick={addExample}>Add</button>
                            </div>
                        </div>
                        <div className="tags">
                            {formData.examples.map((e, index) => (
                                <span key={index} className="tag is-warning is-light">{e}</span>
                            ))}
                        </div>
                    </div>
                    <div className="column is-half">
                        <label className="label">Synonyms</label>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="Add synonym" value={synonym} onChange={(e) => setSynonym(e.target.value)} />
                            </div>
                            <div className="control">
                                <button className="button is-primary" onClick={addSynonym}>Add</button>
                            </div>
                        </div>
                        <div className="tags">
                            {formData.synonyms.map((s, index) => (
                                <span key={index} className="tag is-link is-light">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="buttons mt-4">
                    <button className="button is-success" disabled={!isFormValid} onClick={saveWord}>
                        {isEditMode ? 'Update Word' : 'Save New Word'}
                    </button>
                    {isEditMode && (
                        <button className="button is-warning" onClick={cancelEdit}>Cancel Edit</button>
                    )}
                </div>
            </div>

            <hr className="my-5" />

            <div className="box p-5 has-background-light">
                <h2 className="subtitle has-text-centered">Words List</h2>
                <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>Word ID - Group</th>
                            <th>Word Details</th>
                            <th className="has-text-centered">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="has-text-centered">No words available</td>
                            </tr>
                        ) : (
                            words.map((item) => (
                                <tr key={item.wordId}>
                                    <td>
                                        <div className="tags has-addons">
                                            <span className="tag is-link">{item.wordId}</span>
                                            <span className="tag">{item.groupId}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <ul>
                                            <li><b>Word:</b> <span className="tag is-primary is-light m-1">{item.wordJSON.word}</span></li>
                                            <li><b>Meaning:</b> <span className="tag is-light m-1">{item.wordJSON.meaning}</span></li>
                                            <li><b>Examples:</b> {item.wordJSON.examples.map((e, index) => (<span key={index} className="tag is-warning is-light m-1">{e}</span>))}</li>
                                            <li><b>Synonyms:</b> {item.wordJSON.synonyms.map((s, index) => (<span key={index} className="tag is-link is-light m-1">{s}</span>))}</li>
                                        </ul>
                                    </td>
                                    <td className="has-text-centered">
                                        <button className="button is-info is-light m-1" onClick={() => editWord(item)}>Edit</button>
                                        <button className="button is-danger is-light m-1" onClick={() => confirmDeleteWord(item.wordId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showConfirmation && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Confirm Delete</p>
                            <button className="delete" aria-label="close" onClick={() => setShowConfirmation(false)}></button>
                        </header>
                        <section className="modal-card-body">
                            Are you sure you want to delete this word?
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-danger" onClick={deleteWord}>Delete</button>
                            <button className="button" onClick={() => setShowConfirmation(false)}>Cancel</button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
}
