import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/JWTService';
import axios from 'axios';
import Flag from 'react-world-flags'; // import flag component

export default function Ranking() {
  const [ranks, setRanks] = useState([]);

  async function loadUserRanking() {
    try {
      const token = getToken();
      const response = await axios.get(`https://sambha.in/api/grex/ranking`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.code === 200) {
        console.log(response.data.data);
        setRanks(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUserRanking();
  }, []);

  return (
    <div className='container'>
      <div className='notification is-light is-danger'>
        <p><strong>Disclaimer:</strong> The rankings are updated every 15 minutes.</p>
      </div>

      <div className='columns'>
        <div className='column'>
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Country</th>
                <th>Learn Score</th>
                <th>Test Score</th>
                <th>Challenge Score</th>
                <th>Other Score</th>
                <th>Total Score</th>
              </tr>
            </thead>

            <tbody>
              {ranks.map((rank, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <a href="#">{rank.stageName}</a>
                  </td>
                  <td>
                    <Flag code={rank.countryCode} style={{ width: '30px' }} />
                  </td>
                  <td>{rank.learnScore}</td>
                  <td>{rank.testScore}</td>
                  <td>{rank.challengeScore}</td>
                  <td>{rank.otherScore}</td>
                  <td>{rank.learnScore + rank.testScore + rank.challengeScore + rank.otherScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
