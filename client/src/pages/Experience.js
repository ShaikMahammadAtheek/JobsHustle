import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jobss from '../components/Jobss';

//import '../styles/jobCards.css'; // Import the common CSS for job cards

const Experience = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('https://jobs-hustle.onrender.com/api/experience')  // Make sure the API URL is correct
      .then((response) => {
        setJobs(response.data);  // Update jobs with response data
      })
      .catch((error) => {
        console.error('Error fetching experience jobs:', error);
        alert('Could not fetch experience jobs, please try again later.');
      });
  }, []);


  return (
    <div>
      <h1>Experience Jobs</h1>


      
      <div className="job-list">

        {jobs.map(job => (
       <Jobss key={job._id} job={job}/>
       
        ))}
      </div>
    





      {/* 
      <div className="job-list">

        {jobs.map(job => (
          <div key={job._id} className="job-card">
            {job.imageUrl && <img src={job.imageUrl} alt={job.title} className="job-card-image" />}
            <h1>{job.title}
            </h1>
            <p>{job.description}</p>
            {/*<p>{job.company}</p>*}
            <p>{job.location}</p>
          </div>
        ))}
      </div>
 */}
    </div>
  );
};

export default Experience;

















/*import React, { useEffect, useState } from 'react';
import { getJobsByCategory } from '../services/jobService';
import Card from '../components/Card';
import '../styles/Experience.css';

const Experience = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobsByCategory('experience').then(res => setJobs(res.data));
  }, []);

  return (
    <div className="experience-container">
      <h2 className="experience-heading">Experience Jobs</h2>
      <div className="experience-job-cards">
        {jobs.slice(0, 8).map(job => (
          <Card key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
*/
