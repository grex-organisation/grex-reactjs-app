import React from 'react'
import { getToken, isAuthenticated } from '../../services/JWTService'

export default function Home() {


  return (
    <div className='container-widescreen'>


      <div class="columns p-6 m-3 home-background-yellow">

        <div class="column">
          
          <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
    
        <button className="button is-black is-fullwidth mt-4">Learn</button>


        </div>

      </div>



      <div class="columns p-6 m-3 home-background-blue">

        <div class="column"><div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        </div>

        <div class="column"><div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        </div>

        <div class="column"><div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        </div>
      </div>


      <div class="columns p-6 m-3 home-background-pink">

        <div class="column"><div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        </div>

        <div class="column"><div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        </div>

        <div class="column"><div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        </div>
      </div>
      


      




    </div>
  )
}
