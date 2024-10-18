import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className='container'>

<div className="columns">
  
  <div className="column">

  <div className="card has-background-danger">
  <Link to="/admin/groups">
  <header className="card-header">
    <p className="card-header-title">Manage Groups</p>
    <button className="card-header-icon" aria-label="more options">
      <span className="icon">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  </Link>
</div>

</div>

  <div className="column">

  <div className="card has-background-primary">
  <Link to="/admin/words">
  <header className="card-header">
    <p className="card-header-title">Manage Words</p>
    <button className="card-header-icon" aria-label="more options">
      <span className="icon">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
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
