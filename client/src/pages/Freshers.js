import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Jobss from '../components/Jobss';
import '../styles/jobCards.css'; // Import the common CSS for job cards
import { Link } from 'react-router-dom';

const Freshers = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('https://jobs-hustle.onrender.com/api/freshers')  // Make sure the API URL is correct
      .then((response) => {
        setJobs(response.data);  // Update jobs with response data
      })
      .catch((error) => {
        console.error('Error fetching freshers jobs:', error);
        alert('Could not fetch freshers jobs, please try again later.');
      });
  }, []);

  return (
    <div>
      <h1>Freshers Jobs</h1>
      // <div className="job-list">

      //   {jobs.map(job => (
      //     <Jobss key={job._id} job={job} />

      //   ))}
      // </div>



  
<section className="top-components">
        <h2 style={{ backgroundColor: 'lightgray' }}>Top Components This Week</h2>
        <div className="top-card-grid jobss">
          {/* Ensure only the latest 5 jobs are shown */}
          {jobs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))  // Sort jobs by latest first
            .slice(0, 5)  // Take the first 5 jobs
            .map((job) => (
              <div key={job._id} className="top-card">
                {job.imageUrl && <img src={job.imageUrl} alt={job.title} className="job-card-image" />}
                <h1>{job.title}</h1>
                <p className="card-description">
                  {job && job.description
                    ? (job.description.length > 40
                      ? job.description.slice(0, 40) + '...'
                      : job.description)
                    : "No description available"}
                </p>
                {/*<p>{job.company}</p>*/}
                <p>{job.location}</p>
                <h1>{job.walkInDate && <p className="card-date">{new Date(job.walkInDate).toLocaleDateString()}</p>}</h1>
                <Link to={`/job/${job._id}`} className="card-link">View Details </Link>
              </div>
            ))}
        </div>
        <button onClick={() => window.open('https://youtube.com', '_blank')}>Subscribe</button>
      </section>







      {/*
      <h1>Freshers Jobs</h1>
      <div className="job-list">
        {jobs.map(job => (
          <div key={job._id} className="job-card">
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.description}</p>
            {job.imageUrl && <img src={job.imageUrl} alt={job.title} className="job-card-image" />}
          </div>
        ))}
      </div>
      */}
    </div>
  );
};

export default Freshers;



















/*import React, { useEffect, useState } from 'react';
import { getJobsByCategory } from '../services/jobService';
import Card from '../components/Card';
import '../styles/Experience.css';
const Freshers = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobsByCategory('freshers').then(res => setJobs(res.data));
  }, []);

  return (
    <div className="freshers-container">
      <h2 className="freshers-heading">Freshers Jobs</h2>
      <div className="freshers-job-cards">
        {jobs.slice(0, 8).map(job => (
          <Card key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Freshers;
*/
