import React, { useState } from 'react'
import { RANKING_URL } from '../../constants/URL';
import { getToken } from '../../services/JWTService';
import axios from 'axios';
import { useEffect } from 'react';

export default function Ranking() {

  const [ranks,setRanks] = useState([]);
  const [rank,setRank] = useState(1);

  async function loadUserRanking(){
    try {
      const token = getToken();  
      const response = await axios.get(RANKING_URL, {headers: {'Authorization': `Bearer ${token}`}} );
      if (response.data.code === 200) {
        console.log(response.data.data)
        setRanks(response.data.data);
      }
  } catch (error) {}
  }

useEffect(()=>{loadUserRanking()},[])


  return (

<div className='container'>
  
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

         {

        ranks.map((rank)=>(

        <tr>
          <th>1</th>
          <td>
            <a href="">{rank.userId}</a>
          </td>
          <td>India</td>
          <td>{rank.learnScore}</td>
          <td>{rank.practiceScore}</td>
          <td>{rank.challengeScore}</td>
          <td>{rank.otherScore}</td>
          <td>{rank.totalScore}</td>
        </tr>
 
          ))
         }
        
      </tbody>
    </table>

    </div>
  </div>

    
</div>
  )
}
