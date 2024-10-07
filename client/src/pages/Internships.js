import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/jobCards.css'; // Import the common CSS for job cards
import Jobss from '../components/Jobss';
import Spinner from '../components/Spinner'; // Import your Spinner component

const Internships = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get('https://jobs-hustle.onrender.com/api/internships'); // Fetch internships
        setJobs(response.data); // Update jobs with response data
      } catch (error) {
        console.error('Error fetching internships:', error);
        alert('Could not fetch internships, please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchJobs(); // Call the fetch function
  }, []);

  return (
    <div>
      <h1>Internships</h1>
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








