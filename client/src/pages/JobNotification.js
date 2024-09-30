import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../services/jobService'; // Assuming you have a service to get job details

const JobDetails = () => {
    const { id } = useParams(); // Get job ID from the URL
    const [job, setJob] = useState(null);

    useEffect(() => {
        // Fetch job details by ID (you'll need to implement this in jobService.js)
        getJobById(id).then(res => setJob(res.data));
    }, [id]);

    return (
        <div>
            {job ? (
                <div className="job-details">
                    <h2>{job.jobTitle}</h2>
                    <img src={job.companyImage} alt={job.companyName} />
                    <p>{job.jobDescription}</p>

                    {/* Add Eligibility Details */}
                    <h3>Eligibility Criteria</h3>
                    <ul>
                        {job.eligibility && job.eligibility.map((criteria, index) => (
                            <li key={index}>{criteria}</li>
                        ))}
                    </ul>

                    {/* Apply Button */}
                    <button
                        onClick={() => window.open(job.applyLink, '_blank')}
                        className="apply-button"
                    >
                        Apply Job
                    </button>
                </div>
            ) : (
                <p>Loading job details...</p>
            )}
        </div>
    );
};

export default JobDetails;













/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import '../styles/JobNotification.css';
const JobNotification = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        getJobById(id).then(res => setJob(res.data));
    }, [id]);

    return (
        <div>
            {job ? (
                <div>
                    <h2>{job.jobTitle}</h2>
                    <img src={job.companyImage} alt={job.companyName} />
                    <p>{job.jobDescription}</p>
                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Here</a>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default JobNotification;
*/