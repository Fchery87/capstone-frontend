import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../utils/api';

function EventForm({ dispatch }) {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    image: null,
    creator: 'Admin' // Placeholder creator
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.category) {
      setError('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    for (const key in newEvent) {
      formData.append(key, newEvent[key]);
    }

    try {
      const response = await API.post('/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: 'ADD_EVENT', payload: response.data });
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: '',
        image: null,
        creator: 'Admin' // Reset creator
      });
      setError(null);
      toast.success('Event created successfully!');
    } catch (error) {
      setError('Error submitting event: ' + error.message);
      toast.error('Error creating event. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Event Title"
          required
        />
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          placeholder="Event Description"
          required
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={newEvent.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          value={newEvent.location}
          onChange={handleInputChange}
          placeholder="Event Location"
          required
        />
        <input
          type="text"
          name="category"
          value={newEvent.category}
          onChange={handleInputChange}
          placeholder="Event Category"
          required
        />
        <input
          type="file"
          name="image"
          onChange={(e) => setNewEvent({ ...newEvent, image: e.target.files[0] })}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

EventForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default EventForm;
