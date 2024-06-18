import { useState } from 'react';
import { toast } from 'react-toastify';
import { getWeather } from '../utils/weatherAPI';

function WeatherForecast() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      toast.error('Please enter a location.');
      return;
    }

    try {
      const weatherData = await getWeather(location);
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast.error('Error fetching weather data. Please try again.');
    }
  };

  const getDayOfWeek = (date) => {
    const options = { weekday: 'long' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
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

export default WeatherForecast;
