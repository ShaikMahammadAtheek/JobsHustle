import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jobss from '../components/Jobss';
import Spinner from '../components/Spinner'; // Make sure to import your Spinner component

const Experience = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get('https://jobs-hustle.onrender.com/api/experience'); // Ensure the API URL is correct
        setJobs(response.data); // Update jobs with response data
      } catch (error) {
        console.error('Error fetching experience jobs:', error);
        alert('Could not fetch experience jobs, please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Experience Jobs</h1>
      {loading ? ( // Conditional rendering based on loading state
        <Spinner /> // Show spinner while loading
      ) : (
        <div className="job-list">
          {jobs.map(job => (
            <Jobss key={job._id} job={job} />
          ))}
        </div>
      )}
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
