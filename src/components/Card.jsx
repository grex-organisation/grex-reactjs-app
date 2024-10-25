import React from 'react'
import Learn from '../assets/dashboard/learn.webp';
import Practice from '../assets/dashboard/practice.webp';
import ReadAI from '../assets/dashboard/ReadAI.webp';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function getProgressImage(progress){
    
    if(progress < 10){
        return Learn;
    }
    else if (progress >=10 && progress < 30){
        return Practice;
    }
    else if (progress >=30 && progress < 60){
        return ReadAI;
    }
    else if (progress >=60 && progress <= 99){
        return Practice;
    }
    else if (progress == 100){
      return Learn;
    }
}

export default function Card(props) {

const groupId = props.id;
const navigate = useNavigate();

function onCardClick(){
   navigate(`/learn/group/`+groupId);
}

    return (
        <div>
        <div className="card p-3 m-3 learn-card-size" onClick={onCardClick}>
            <div className="card-image">
                <figure>
                    <img
                        src={getProgressImage(props.progress)}
                        alt="Placeholder image"
                    />
                </figure>
            </div>
            <div className="card-content">
                <div className="content">
                    <p>{props.name}</p>
                    <progress className="progress is-warning" value={props.progress} max="100">
                    </progress>
                </div>
            </div>
        </div>
         
       <progress className="progress is-success is-large" value={props.progress} max="100"/>
        </div>
  )
}
