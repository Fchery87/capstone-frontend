import axios from 'axios';

const API = axios.create({
  baseURL: 'https://capstone-backend-9d1u.onrender.com',
  // baseURL: 'http://localhost:4000/api',
});

export default API;
