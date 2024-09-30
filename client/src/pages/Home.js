
/*


*/








//trail code
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card'; // Assuming you have a Card component
import '../styles/Home.css';
import './Home.css';
import { Link } from 'react-router-dom';


const Home = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('https://jobs-hustle.onrender.com/api/home') // Fetch sorted jobs
            .then((response) => {
                setJobs(response.data); // Set the jobs in state
            })
            .catch((error) => {
                console.error('Error fetching jobs:', error);
                alert('Could not fetch jobs, please try again later.');
            });
    }, []);

    return (
        <div>
            <section className="job-cards">
                <h1 style={{ textAlign: 'center' }}>All Jobs</h1>
                <div className="job-grid">
                    {jobs.map((job) => (
                        <Card key={job._id} job={job} />
                    ))}
                </div>
            </section>


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
                                <p>{job.description}</p>
                                {/*<p>{job.company}</p>*/}
                                <p>{job.location}</p>
                                <h1>{job.walkInDate && <p className="card-date">{new Date(job.walkInDate).toLocaleDateString()}</p>}</h1>
                                <Link to={`/job/${job._id}`} className="card-link">View Details </Link>
                            </div>
                        ))}
                </div>
                <button onClick={() => window.open('https://youtube.com', '_blank')}>Subscribe</button>
            </section>

        </div>
    );
};

export default Home;




/*
//fetch jobs data from database
// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card'; // Assuming you have a Card component to display jobs
import '../styles/Home.css';
import './Home.css';

const Home = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/home')  // Fetch all job data from the backend
            .then((response) => {
                setJobs(response.data);  // Update jobs with response data
            })
            .catch((error) => {
                console.error('Error fetching jobs:', error);
                alert('Could not fetch jobs, please try again later.');
            });
    }, []);

    // Group jobs by type:- it is used to group the by thier type and Disply all Jobs
    //Later we use this
//    const groupedJobs = jobs.reduce((acc, job) => {
//        (acc[job.jobType] = acc[job.jobType] || []).push(job);
//        return acc;
//    }, {});
//
//
    return (
       
        <div>
            <section className="job-cards">
            <h1 style={{ textAlign: 'center' }}>All Jobs</h1>
            <div className="job-grid">
                {jobs.map((job) => (
                    <Card key={job._id} job={job} />
                ))}
            </div>
            </section>

            <section className="top-components">
                <h2 style={{ backgroundColor: 'lightgray' }}>Top Components This Week</h2>
                <div className="top-card-grid">
                    
                    <div className="top-card">Top Card 1</div>
                    <div className="top-card">Top Card 2</div>
                    <div className="top-card">Top Card 3</div>
                    <div className="top-card">Top Card 4</div>
                    <div className="top-card">Top Card 5</div>
                </div>
                <button onClick={() => window.open('https://youtube.com', '_blank')}>Subscribe</button>
            </section>

            <section className="feedback-form">
                <h2>Feedback</h2>
                <form>
                    <label>
                        Your Feedback:
                        <textarea rows="4" />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>

    );
};

*/

/*<div>
<h1 style={{ textAlign: 'center' }}>All Job Types</h1>
{Object.keys(groupedJobs).map((jobType) => (
  <div key={jobType}>
    <h2>{jobType}</h2>
    <div className="job-list">
      {groupedJobs[jobType].slice(0, 8).map((job) => (
        <div key={job._id} className="job-card">
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.description}</p>
          <img src={job.imageUrl} alt={job.title} />
        </div>
      ))}
    </div>
  </div>
))}
</div>
);
};




export default Home;

*/





