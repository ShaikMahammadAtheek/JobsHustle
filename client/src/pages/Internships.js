import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/jobCards.css'; // Import the common CSS for job cards
import Jobss from '../components/Jobss';
import Spinner from '../components/Spinner'; // Import your Spinner component

const Internships = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // API URL from environment variable or hardcoded fallback
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get(`${API_URL}/internships`); // Fetch internships
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
       <section className="job-cards">
                <div>
                    <h1 style={{ textAlign: 'center' }}>Interships Jobs</h1>
                </div>

                {/* Conditionally render spinner or job cards */}
                {loading ? (
                    <Spinner />  // Show spinner while loading
                ) : (
                    <div className="carts">
                        {jobs.map((job) => (
                            <Card key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </section>
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








