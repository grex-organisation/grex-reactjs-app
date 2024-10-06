import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardCard(props) {
  return (
    <Link to={props.link}>

                <div className="card dashboard-card-size">

                  <div className="card-image p-2">
                    <figure>
                      <img
                        src={props.image}
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>

                  <div className="card-content">

                    <div className='media'>
                      <div className="media-content">
                        <p className="title is-4 has-text-centered pt-3">{props.name}</p>
                      </div>
                    </div>

                    <div className="content">{props.content}</div>
                  </div>

                  <footer className="card-footer">
                  <button className="button is-warning is-medium is-fullwidth is-centered m-3">Play</button>
                  </footer>

                </div>
              </Link>
  )
}
