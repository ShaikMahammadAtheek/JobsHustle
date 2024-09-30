import axios from 'axios';

const API_URL = 'https://jobs-hustle.onrender.com/notifications';

export const getNotifications = () => axios.get(API_URL);
