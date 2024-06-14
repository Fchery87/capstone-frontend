import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Ensure this matches your backend URL and port
});

export default API;
