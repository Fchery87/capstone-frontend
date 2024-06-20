// Importing tools from React and other libraries needed
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import API from '../utils/api';

// The LoginForm component handles user login
function LoginForm({ dispatch }) {
  // Using state to keep track of the form data
  const [formData, setFormData] = useState({ username: '', password: '' });
  // Using state to keep track of any errors
  const [error, setError] = useState(null);
  // useNavigate is used to programmatically navigate after login
  const navigate = useNavigate();

  // Function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Making an API call to login the user
      const response = await API.post('/auth/login', formData);
      // If successful, update the state with the user data
      dispatch({ type: 'LOGIN', payload: response.data });
      // Redirect to the main page after login
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      // If there's an error, show the error message
      setError(error.response.data.msg);
    }
  };

  // Function runs when an input field is changed
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the state with the new input value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* If there's an error, display it here */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Input fields for username and password */}
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
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
      <button type="submit">Login</button>
    </form>
  );
}

// Define the prop types for the LoginForm component
LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Export the LoginForm component so it can be used in other parts of the app
export default LoginForm;
