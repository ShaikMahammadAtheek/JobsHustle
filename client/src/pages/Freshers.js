import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jobss from '../components/Jobss';
import Spinner from '../components/Spinner'; // Make sure to import your Spinner component
import '../styles/jobCards.css'; // Import the common CSS for job cards

const Freshers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state


  // API URL from environment variable or hardcoded fallback
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get(`${API_URL}/freshers`); // Ensure the API URL is correct
        setJobs(response.data); // Update jobs with response data
      } catch (error) {
        console.error('Error fetching freshers jobs:', error);
        alert('Could not fetch freshers jobs, please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
        <section className="job-cards">
                <div>
                    <h1 style={{ textAlign: 'center' }}>Freshers Jobs</h1>
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
