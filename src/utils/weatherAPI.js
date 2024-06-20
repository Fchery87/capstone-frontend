// Importing axios to handle HTTP requests
import axios from 'axios';

// The API key for accessing the weather API
const API_KEY = '9438aa16e9c04dcf8c7183223241806';

// Function to get weather data for a specific location
export const getWeather = async (location) => {
  try {
    // Making an API call to get the weather forecast for the next 8 days
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=8`
    );
    // Returning the weather data if the call is successful
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Throwing an error if the API call fails
    throw error;
  }
};
