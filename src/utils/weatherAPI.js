import axios from 'axios';

const API_KEY = '9438aa16e9c04dcf8c7183223241806';

export const getWeather = async (location) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=8`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
