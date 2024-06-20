// Importing axios to handle HTTP requests
import axios from 'axios';

// Creating an axios instance with a base URL for the API
const API = axios.create({
  //+ Uncomment the line below to use the Render development server instead
  baseURL: 'https://capstone-backend-9d1u.onrender.com/api',

  //+ Uncomment the line below to use the local development server instead
  // baseURL: 'http://localhost:4000/api',
});

// Exporting the API instance for use in other parts of the app
export default API;
