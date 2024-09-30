import React from 'react'
import { Link } from 'react-router-dom';
import './Jobss.css';
//import '../styles/Card.css';
function Jobss({job}) {
  return (
    <div className='jobsscol'>
      <div key={job._id} className="job-card">
            {job.imageUrl && <img src={job.imageUrl} alt={job.title} className="job-card-image" />}
            <h1>{job.title}
            </h1>
            <p>{job.description.length > 40 ? job.description.slice(0, 60) + '...' : job.description}</p>
            {/*<p>{job.company}</p>*/}
            <p>{job.location}</p>
            <h1>{job.walkInDate && <p className="card-date">{new Date(job.walkInDate).toLocaleDateString()}</p>}</h1>
            <Link to={`/job/${job._id}`} className="card-link">View Details </Link>
        </div>
    </div>
  )
}

export default Jobss
