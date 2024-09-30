//latest code
import '../styles/Support.css';



import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Support.css';

const Support = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jobs-hustle.onrender.com/api/feedback', feedback);
      if (response.data.success) {
        setStatus('Feedback submitted successfully!');
            // Hide the message after 5 seconds
      setTimeout(() => {
        setStatus('');
      }, 5000);
        setFeedback({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      setStatus('Error submitting feedback.');
    }
  };

  return (
    <div className="support-container">
      <h1 className='Supporth1'>How can we help?</h1>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={feedback.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={feedback.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <textarea
          name="message"
          value={feedback.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        ></textarea>
        <button type="submit">Submit</button>
        {status && <p className="status-message">{status}</p>}
      </form>
   
    </div>
  );
};

export default Support;




//Main code
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/jobCards.css'; // Import the common CSS for job cards

const Support = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/support')  // Make sure the API URL is correct
      .then((response) => {
        setJobs(response.data);  // Update jobs with response data
      })
      .catch((error) => {
        console.error('Error fetching support jobs:', error);
        alert('Could not fetch support jobs, please try again later.');
      });
  }, []);

  return (
    <div>
      <h1>Support Jobs</h1>
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

export default Support;



*/






/*import React from 'react';
import '../styles/Support.css';

const Support = () => {
  return (
    <div className="support-container">
      <h2 className="support-heading">Support</h2>
      <p>If you need assistance, please contact us.</p>
    </div>
  );
};

export default Support;
*/
