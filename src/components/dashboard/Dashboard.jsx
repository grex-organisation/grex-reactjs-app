import React from 'react'
import Learn from '../../assests/dashboard/learn.webp';
import Practice from '../../assests/dashboard/practice.webp';
import ReadAI from '../../assests/dashboard/ReadAI.webp';
import DashboardCard from '../../ui/DashboardCard';

export default function Dashboard() {

  const dashboardOptions = [
    {
      "name": "Learn",
      "link": "/learn",
      "color": "danger",
      "image": Learn,
      "content": "learn 5000+ GRE words in smart way"
    }
  ];


  return (
    <div className="container mt-6">

      <div className='columns'>

        {
          dashboardOptions.map((item, key) => (

            <div className='column is-one-fourth'>
              <DashboardCard name={item.name} link={item.link} image={item.image} content={item.content}/>
            </div>

          ))
        }



      </div>


    </div>
  )
}
