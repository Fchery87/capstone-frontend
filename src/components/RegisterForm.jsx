import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    city: '',
    state: '',
    country: '',
    isAdult: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.isAdult) {
      alert('You must be 18 years or older to register.');
      return;
    }
    console.log('Submitting form data:', formData); // Log form data
    try {
      await API.post('/auth/register', formData);
      navigate('/login', { state: { msg: 'Registration successful! Please sign in to create an event.' } }); // Redirect to the login page with a message
    } catch (error) {
      console.error('Error registering:', error);
      setError(error.response.data.msg);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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

export default RegisterForm;
