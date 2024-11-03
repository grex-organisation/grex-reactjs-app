import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/JWTService';
import axios from 'axios';
import Flag from 'react-world-flags';
import { getName } from 'country-list';


export default function Ranking() {
  const [ranks, setRanks] = useState([]);
  const [page, setPage] = useState(1);

  async function loadUserRanking() {
    try {
      const token = getToken();
      const response = await axios.get(`https://grexhub.b-cdn.net/api/grex/cdn/ranking`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { page }
      });
      if (response.data.code === 200) {
        const data = response.data.data;
        setRanks(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUserRanking();
  }, [page]);

  return (
    <div className='container'>
      <div className='notification is-light is-danger'>
        <p><strong>Disclaimer:</strong> The rankings are updated every 1 hour.</p>
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
                  <th>{rank.rank}</th>
                  <td><a href="#">{rank.stageName}</a></td>
                  <td>
                    <Flag 
                      code={rank.countryCode} 
                      style={{ width: '30px' }} 
                      title={getName(rank.countryCode) || rank.countryCode} // Display full country name
                    />
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

      <div className="pagination is-centered mt-4">
        <button
          className="pagination-previous button is-light"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <div className="pagination-list">
          <span className="pagination-link is-current">{`Page ${page}`}</span>
        </div>

        <button
          className="pagination-next button is-light"
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>


    </div>
  );
}
