import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className='container'>

<div class="columns">
  
  <div class="column">

  <div class="card has-background-danger">
  <Link to="/admin/groups">
  <header class="card-header">
    <p class="card-header-title">Manage Groups</p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  </Link>
</div>

</div>

  <div class="column">

  <div class="card has-background-primary">
  <Link to="/admin/words">
  <header class="card-header">
    <p class="card-header-title">Manage Words</p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  </Link>
</div>

  </div>


</div>
    </div>
  )
}
