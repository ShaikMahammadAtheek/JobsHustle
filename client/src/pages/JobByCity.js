//Main code
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/jobCards.css'; // Import the common CSS for job cards

const JobByCity = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobbycity')  // Make sure the API URL is correct
      .then((response) => {
        setJobs(response.data);  // Update jobs with response data
      })
      .catch((error) => {
        console.error('Error fetching jobs by city:', error);
        alert('Could not fetch jobs by city, please try again later.');
      });
  }, []);

  return (
    <div>
      <h1>Jobs By City</h1>
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
    </div>
  );
};

export default JobByCity;

*/


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Jobss from '../components/Jobss';
import Spinner from '../components/Spinner'; // Import your Spinner component

const JobByCity = () => {
  const { city } = useParams(); // Get city from URL
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get(`https://jobs-hustle.onrender.com/api/job-by-city/${city}`); // Fetch jobs by city
        setJobs(response.data); // Set jobs with response data
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Could not fetch jobs, please try again later.'); // Optional alert for error handling
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchJobs(); // Call the fetch function
  }, [city]);

  return (
    <div>
      <h1>Jobs in {city}</h1>
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

export default JobByCity;


















/*import React, { useEffect, useState } from 'react';
import { getJobsByCategory } from '../services/jobService';
import Card from '../components/Card';
import '../styles/JobByCity.css';

const JobByCity = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobsByCategory('job-by-city').then(res => setJobs(res.data));
  }, []);

  return (
    <div className="job-by-city-container">
      <h2 className="job-by-city-heading">Job By City</h2>
      <div className="job-by-city-job-cards">
        {jobs.slice(0, 8).map(job => (
          <Card key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobByCity;
*/
