import axios from 'axios';

const API_URL = 'http://localhost:5000/notifications';

export const getNotifications = () => axios.get(API_URL);
