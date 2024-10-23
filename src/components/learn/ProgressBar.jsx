import React from 'react'
import {useNavigate } from 'react-router-dom';

export default function progressBar(props) {
    return (         
       <progress class="progress is-success is-large" value={props.progress} max="100"/>
  )
}
