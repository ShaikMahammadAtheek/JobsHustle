









import axios from 'axios';

const API_URL = 'http://localhost:5000/jobs';


export const getJobs = () => axios.get(API_URL);
export const getJobById = (id) => axios.get(`${API_URL}/${id}`);


export const getJobsByCategory = (category) => {
  return axios.get(`/api/jobs?category=${category}`);
};

//export const getJobsByCategory = (category) => axios.get(`${API_URL}?category=${category}`);

/*


// src/services/jobService.js
import axios from 'axios';

// Get all job notifications
export const getJobs = async () => {
  return await axios.get('/api/jobs');
};

// Get specific job by ID
export const getJobById = async (id) => {
  return await axios.get(`/api/jobs/${id}`);
};

// Get notifications (You may need to define this function)
export const getNotifications = async () => {
  return await axios.get('/api/notifications'); // Adjust the URL based on your backend route
};

*/