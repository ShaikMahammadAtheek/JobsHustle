import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';  // Assuming Spinner is a component for loading indication
import Card from './Card';  // Assuming Card is a component for rendering job cards

const Internships = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // API URL from environment variable or hardcoded fallback
  //const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get(`https://jobs-hustle.onrender.com/api/internships`); // Fetch internships from dynamic API URL
        setJobs(response.data); // Update jobs with response data
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchJobs();
  }, [API_URL]);

  return (
    <div>
      <h1>Internships</h1>
      <div className="job-list">

        {jobs.map(job => (
       <Jobss key={job._id} job={job}/>
       
        ))}
      </div>
    </div>
  );
};

export default Internships;























/*import React, { useEffect, useState } from 'react';
import { getJobsByCategory } from '../services/jobService';
import Card from '../components/Card';
import '../styles/Internships.css'

const Internships = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobsByCategory('internships').then(res => setJobs(res.data));
  }, []);

  return (
    <div className="internships-container">
      <h2 className="internships-heading">Internships</h2>
      <div className="internships-job-cards">
        {jobs.slice(0, 8).map(job => (
          <Card key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Internships;
*/








