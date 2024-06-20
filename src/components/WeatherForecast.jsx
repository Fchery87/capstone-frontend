// Importing tools from React and other libraries needed
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getWeather } from '../utils/weatherAPI';

// The WeatherForecast component gets and displays weather information
function WeatherForecast() {
  // Using state to keep track of the location input
  const [location, setLocation] = useState('');
  // Using state to keep track of the weather data
  const [weather, setWeather] = useState(null);

  // Function runs when the input field is changed
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  // Function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      toast.error('Please enter a location.');
      return;
    }

    try {
      // Making an API call to get the weather data
      const weatherData = await getWeather(location);
      // If successful, update the state with the weather data
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // If there's an error, show the error message
      toast.error('Error fetching weather data. Please try again.');
    }
  };

  // Function to get the day of the week from a date
  const getDayOfWeek = (date) => {
    const options = { weekday: 'long' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {/* The main heading for the weather forecast page */}
      <h1>Weather Forecast</h1>
      {/* The form to enter the location */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder="Enter location"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {/* Display the weather data if available */}
      {weather && (
        <div>
          <h2>Weather for {location}</h2>
          <p>Temperature: {weather.current.temp_f} °F</p>
          <p>Condition: {weather.current.condition.text}</p>
          <h3>Weekly Forecast</h3>
          {weather.forecast.forecastday.slice(1).map((day, index) => (
            <div key={index}>
              <p>{getDayOfWeek(day.date)}: {day.day.avgtemp_f} °F - {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Export the WeatherForecast component so it can be used in other parts of the app
export default WeatherForecast;
