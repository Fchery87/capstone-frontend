// Importing tools from React and other libraries needed
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

// The RegisterForm component handles user registration
function RegisterForm() {
  // Using state to keep track of the form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    city: '',
    state: '',
    country: '',
    isAdult: false,
  });
  // Using state to keep track of any errors
  const [error, setError] = useState(null);
  // useNavigate is used to programmatically navigate after registration
  const navigate = useNavigate();

  // Function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.isAdult) {
      alert('You must be 18 years or older to register.');
      return;
    }
    console.log('Submitting form data:', formData); // Log form data
    try {
      // Making an API call to register the user
      await API.post('/auth/register', formData);
      // Redirect to the login page with a message after successful registration
      navigate('/login', { state: { msg: 'Registration successful! Please sign in to create an event.' } });
    } catch (error) {
      console.error('Error registering:', error);
      // If there's an error, show the error message
      setError(error.response.data.msg);
    }
  };

  // Function runs when an input field is changed
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Update the state with the new input value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* If there's an error, display it here */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Input fields for registration details */}
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email Address"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        placeholder="City"
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        placeholder="State"
      />
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        placeholder="Country"
      />
      <label>
        <input
          type="checkbox"
          name="isAdult"
          checked={formData.isAdult}
          onChange={handleInputChange}
          required
        />
        I am 18 years of age or older
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

// Export the RegisterForm component so it can be used in other parts of the app
export default RegisterForm;
