/*import React, { useEffect, useState } from 'react';
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

                    
                    <h3>Eligibility Criteria</h3>
                    <ul>
                        {job.eligibility && job.eligibility.map((criteria, index) => (
                            <li key={index}>{criteria}</li>
                        ))}
                    </ul>

                    
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
*/


/*
//Main code
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/home/${id}`)
      .then(response => {
        setJob(response.data);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details-container">
      <h1 style={{ textAlign: 'center' }}>{job.title}</h1>
      <h3 style={{ textAlign: 'center' }}>Type: {job.jobType}</h3>
      <h3 style={{ textAlign: 'center' }}>Posted on: {new Date(job.date).toLocaleDateString()}</h3>

      <p>{job.description}</p>

      <table className="job-details-table">
        <tbody>
          <tr>
            <td>Job Role</td>
            <td>{job.jobRole}</td>
          </tr>
          <tr>
            <td>Qualification</td>
            <td>{job.qualification}</td>
          </tr>
          <tr>
            <td>Experience</td>
            <td>{job.experience}</td>
          </tr>
          <tr>
            <td>Salary/CTC</td>
            <td>{job.salary}</td>
          </tr>
          <tr>
            <td>Job Location</td>
            <td>{job.location}</td>
          </tr>
          <tr>
            <td>Venue Location</td>
            <td>{job.venueLocation}</td>
          </tr>
          <tr>
            <td>Walk-in Date</td>
            <td>{job.walkInDate}</td>
          </tr>
        </tbody>
      </table>

      <h3>Eligibility Details</h3>
      <p>{job.eligibilityDetails}</p>
    </div>
  );
};

export default JobDetails;

*/



/*
//new code

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/home/${id}`)
      .then(response => {
        setJob(response.data);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details-container">
      <h1 style={{ textAlign: 'center' }}>{job.positionTitle}</h1>
      <h2 style={{ textAlign: 'center' }}>{job.companyName}</h2>
      
      <div className="job-summary" style={{ textAlign: 'center' }}>
        <div className="job-info">
          <span className="icon experience-icon"></span>
          <span>{job.experience}</span>
        </div>
        <div className="job-info">
          <span className="icon salary-icon"></span>
          <span>{job.salary}</span>
        </div>
        <div className="job-info">
          <span className="icon qualification-icon"></span>
          <span>{job.qualification}</span>
        </div>
        <div className="job-info">
          <span className="icon location-icon"></span>
          <span>{job.location}</span>
        </div>
        <button className="apply-now-button">Apply Now</button>
      </div>

      <div className="job-details" >
        <h3>Posted: {new Date(job.postedDate).toLocaleDateString()}</h3>
        <h4>Job Description</h4>
        <p>{job.jobDescription}</p>

        <h4>Job Information:</h4>
        <table className="job-details-table">
          <tbody>
            <tr>
              <td>Workplace Type</td>
              <td>{job.workplaceType}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{job.location}</td>
            </tr>
            <tr>
              <td>Position Title</td>
              <td>{job.positionTitle}</td>
            </tr>
            <tr>
              <td>Job Function</td>
              <td>{job.jobFunction}</td>
            </tr>
            <tr>
              <td>Job Type</td>
              <td>{job.jobType}</td>
            </tr>
            <tr>
              <td>Minimum Education</td>
              <td>{job.minimumEducation}</td>
            </tr>
            <tr>
              <td>Main Stream</td>
              <td>{job.mainStream}</td>
            </tr>
            <tr>
              <td>Min Experience</td>
              <td>{job.minExperience}</td>
            </tr>
          </tbody>
        </table>

        <h4>Responsibilities:</h4>
        <p>{job.responsibilities}</p>

        <h4>Required Qualifications, Capabilities, and Skills:</h4>
        <p>{job.requiredQualifications}</p>

        <h4>Benefits:</h4>
        <p>{job.benefits}</p>

        <h4>Additional Information:</h4>
        <p>{job.additionalInformation}</p>
      </div>
    </div>
  );
};

export default JobDetails;

*/


/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/home/${id}`)
      .then(response => {
        setJob(response.data);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details-container">
      <h1 style={{ textAlign: 'center' }}>{job.title}</h1>
      <h2 style={{ textAlign: 'center' }}>{job.company}</h2>
      
      <div className="job-summary" style={{ textAlign: 'center' }}>
        <div className="job-info">
          <span className="icon experience-icon"></span>
          <span>{job.experience}</span>
        </div>
        <div className="job-info">
          <span className="icon salary-icon"></span>
          <span>{job.salary}</span>
        </div>
        <div className="job-info">
          <span className="icon qualification-icon"></span>
          <span>{job.qualification}</span>
        </div>
        <div className="job-info">
          <span className="icon location-icon"><i className="bi bi-geo-alt-fill"></i></span>
          <span>{job.location}</span>
        </div>
        <button className="apply-now-button">Apply Now</button>
      </div>

      <div className="job-details">
        <h3>Posted: {new Date(job.postedDate).toLocaleDateString()}</h3>
        <h4>Job Description</h4>
        <p>{job.jobDescription.description}</p>

        <h4>Job Information:</h4>
        <table className="job-details-table">
          <tbody>
            <tr>
              <td>Workplace Type</td>
              <td>{job.jobDescription.workplaceType}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{job.jobDescription.location}</td>
            </tr>
            <tr>
              <td>Position Title</td>
              <td>{job.jobDescription.positionTitle}</td>
            </tr>
            <tr>
              <td>Job Function</td>
              <td>{job.jobDescription.jobFunction}</td>
            </tr>
            <tr>
              <td>Job Type</td>
              <td>{job.jobDescription.jobType}</td>
            </tr>
            <tr>
              <td>Minimum Education</td>
              <td>{job.jobDescription.minEducation}</td>
            </tr>
            <tr>
              <td>Main Stream</td>
              <td>{job.jobDescription.mainStream}</td>
            </tr>
            <tr>
              <td>Min Experience</td>
              <td>{job.jobDescription.minExperience}</td>
            </tr>
          </tbody>
        </table>

        <h4>Responsibilities:</h4>
        <ul>
          {job.jobDescription.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>

        <h4>Required Qualifications, Capabilities, and Skills:</h4>
        <ul>
          {job.jobDescription.qualifications.map((qualification, index) => (
            <li key={index}>{qualification}</li>
          ))}
        </ul>

        <h4>Benefits:</h4>
        <ul>
          {job.jobDescription.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;
*/

/*

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/home/${id}`)
      .then(response => {
        setJob(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div></div>
      </div>
    );
  }

  if (!job) {
    return <div>Error loading job details</div>;
  }

  return (
    <div className='bgcol'>
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <h2>{job.company}</h2>
      
      <div className="job-summary">
        <div className="job-info">
          <span className="icon experience-icon">📅</span>
          <span>{job.experience}</span>
        </div>
        <div className="job-info">
          <span className="icon salary-icon">💼</span>
          <span>{job.salary}</span>
        </div>
        <div className="job-info">
          <span className="icon qualification-icon">🎓</span>
          <span>{job.qualification}</span>
        </div>
        <div className="job-info">
          <span className="icon location-icon">📍</span>
          <span>{job.location}</span>
        </div>
        
      </div>
      <div className=''></div>
      <button
  className="apply-now-button"
  style={{
    display: 'block',
    margin: '0 auto',
    textAlign: 'left',
    transform: 'translate(-50%, -50%)'
  }}
>
  Apply Now
</button>


      <div className="job-details">
        <h3>Posted: {new Date(job.postedDate).toLocaleDateString()}</h3>
        <h4>Job Description</h4>
        <p>{job.jobDescription.description}</p>

        <h4>Job Information:</h4>
        <table className="job-details-table">
          <tbody>
            <tr>
              <td>Workplace Type</td>
              <td>{job.jobDescription.workplaceType}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{job.jobDescription.location}</td>
            </tr>
            <tr>
              <td>Position Title</td>
              <td>{job.jobDescription.positionTitle}</td>
            </tr>
            <tr>
              <td>Job Function</td>
              <td>{job.jobDescription.jobFunction}</td>
            </tr>
            <tr>
              <td>Job Type</td>
              <td>{job.jobDescription.jobType}</td>
            </tr>
            <tr>
              <td>Minimum Education</td>
              <td>{job.jobDescription.minEducation}</td>
            </tr>
            <tr>
              <td>Main Stream</td>
              <td>{job.jobDescription.mainStream}</td>
            </tr>
            <tr>
              <td>Min Experience</td>
              <td>{job.jobDescription.minExperience}</td>
            </tr>
          </tbody>
        </table>

        <h4>Responsibilities:</h4>
        <ul>
          {job.jobDescription.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>

        <h4>Required Qualifications, Capabilities, and Skills:</h4>
        <p>{job.jobDescription.requiredQualifications}</p>

        <h4>Benefits:</h4>
        <p>{job.jobDescription.benefits}</p>

        <h4>Additional Information:</h4>
        <p>{job.jobDescription.additionalInformation}</p>
      </div>
    </div>
    </div>
  );
};

export default JobDetails;

*/


/*


//now main code
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/home/${id}`)
      .then(response => {
        setJob(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div></div>
      </div>
    );
  }

  if (!job) {
    return <div>Error loading job details</div>;
  }

  // Adding checks for jobDescription to ensure it's defined before accessing its properties
  const jobDescription = job.jobDescription || {};

  return (
    <div className="bgcol">
      <div className="job-details-container">
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>

        <div className="job-summary">
          <div className="job-info">
            <span className="icon experience-icon">📅</span>
            <span>{job.experience}</span>
          </div>
          <div className="job-info">
            <span className="icon salary-icon">💼</span>
            <span>{job.salary}</span>
          </div>
          <div className="job-info">
            <span className="icon qualification-icon">🎓</span>
            <span>{job.qualification}</span>
          </div>
          <div className="job-info">
            <span className="icon location-icon">📍</span>
            <span>{job.location}</span>
          </div>
        </div>

        <button
          className="apply-now-button"
          style={{
            display: 'block',
            margin: '0 auto',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => window.location.href = '/apply-now'} // Replace with actual link
        >
          Apply Now
        </button>

        <div className="job-details">
          <h3>Posted: {new Date(job.postedDate).toLocaleDateString()}</h3>
          <h4>Job Description</h4>
          <p>{jobDescription.description || 'No description available.'}</p>

          <h4>Job Information:</h4>
          <table className="job-details-table">
            <tbody>
              <tr>
                <td>Workplace Type</td>
                <td>{jobDescription.workplaceType || 'N/A'}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{jobDescription.location || job.location || 'N/A'}</td>
              </tr>
              <tr>
                <td>Position Title</td>
                <td>{jobDescription.positionTitle || 'N/A'}</td>
              </tr>
              <tr>
                <td>Job Function</td>
                <td>{jobDescription.jobFunction || 'N/A'}</td>
              </tr>
              <tr>
                <td>Job Type</td>
                <td>{jobDescription.jobType || 'N/A'}</td>
              </tr>
              <tr>
                <td>Minimum Education</td>
                <td>{jobDescription.minEducation || 'N/A'}</td>
              </tr>
              <tr>
                <td>Main Stream</td>
                <td>{jobDescription.mainStream || 'N/A'}</td>
              </tr>
              <tr>
                <td>Min Experience</td>
                <td>{jobDescription.minExperience || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <h4>Responsibilities:</h4>
          <ul>
            {jobDescription.responsibilities ? (
              jobDescription.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))
            ) : (
              <li>No responsibilities listed.</li>
            )}
          </ul>

          <h4>Required Qualifications, Capabilities, and Skills:</h4>
          <ul>
            {jobDescription.qualifications ? (
              jobDescription.qualifications.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))
            ) : (
              <li>No qualifications listed.</li>
            )}
          </ul>

          <h4>Benefits:</h4>
          <ul>
            {jobDescription.benefits ? (
              jobDescription.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))
            ) : (
              <li>No benefits listed.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
*/



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/home/${id}`)
      .then(response => {
        setJob(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div></div>
      </div>
    );
  }

  if (!job) {
    return <div>Error loading job details</div>;
  }

  const jobDescription = job.jobDescription || {};

  return (
    <div className="bgcol">
      <div className="job-details-container">
        <h1>{job.title}</h1>
        <h2><i style={{color:"red"}}>Company: </i>{job.company}</h2>

        <div className="job-summary">
          <div className="job-info">
            <span className="icon experience-icon">📅</span>
            <span>{job.experience}</span>
          </div>
          <div className="job-info">
            <span className="icon salary-icon">💼</span>
            <span>{job.salary}</span>
          </div>
          <div className="job-info">
            <span className="icon qualification-icon">🎓</span>
            <span>{job.qualification}</span>
          </div>
          <div className="job-info">
            <span className="icon location-icon">📍</span>
            <span>{job.location}</span>
          </div>
        </div>
        <div className="apply-button-container">
        <button className="apply-now-button apply-button"
          onClick={() => window.location.href = job.applyNowLink} // Uses the correct apply link
        >
          Apply Now
        </button>
        </div>

        <div className="job-details">
          <h3>Posted: {new Date(job.postedDate).toLocaleDateString()}</h3>
          <h4>Job Description</h4>
          <p>{jobDescription.description || 'No description available.'}</p>

          <h4>Job Information:</h4>
          <table className="job-details-table">
            <tbody>
              <tr>
                <td>Workplace Type</td>
                <td>{jobDescription.workplaceType || 'N/A'}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{jobDescription.location || job.location || 'N/A'}</td>
              </tr>
              <tr>
                <td>Position Title</td>
                <td>{jobDescription.positionTitle || 'N/A'}</td>
              </tr>
              <tr>
                <td>Job Function</td>
                <td>{jobDescription.jobFunction || 'N/A'}</td>
              </tr>
              <tr>
                <td>Job Type</td>
                <td>{jobDescription.jobType || 'N/A'}</td>
              </tr>
              <tr>
                <td>Minimum Education</td>
                <td>{jobDescription.minEducation || 'N/A'}</td>
              </tr>
              <tr>
                <td>Main Stream</td>
                <td>{jobDescription.mainStream || 'N/A'}</td>
              </tr>
              <tr>
                <td>Min Experience</td>
                <td>{jobDescription.minExperience || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <h4>Responsibilities:</h4>
          <ul>
            {jobDescription.responsibilities?.length > 0 ? (
              jobDescription.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))
            ) : (
              <li>No responsibilities listed.</li>
            )}
          </ul>

          <h4>Required Qualifications, Capabilities, and Skills:</h4>
          <ul>
            {jobDescription.qualifications?.length > 0 ? (
              jobDescription.qualifications.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))
            ) : (
              <li>No qualifications listed.</li>
            )}
          </ul>

          <h4>Benefits:</h4>
          <ul>
            {jobDescription.benefits?.length > 0 ? (
              jobDescription.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))
            ) : (
              <li>No benefits listed.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
