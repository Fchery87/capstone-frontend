// Importing tools from React and other libraries needed
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../utils/api';

// The EventForm component helps create new events
function EventForm({ dispatch }) {
  // Using state to keep track of the new event details
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    category: '',
    image: null,
    creator: 'Admin' // Placeholder creator
  });
  // Using state to keep track of any errors
  const [error, setError] = useState(null);

  // Function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all required fields are filled in
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.category) {
      setError('Please fill in all required fields.');
      return;
    }

    // Prepare the form data to send to the server
    const formData = new FormData();
    for (const key in newEvent) {
      formData.append(key, newEvent[key]);
    }

    try {
      // Make an API call to create the new event
      const response = await API.post('/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // If successful, update the state with the new event
      dispatch({ type: 'ADD_EVENT', payload: response.data });
      // Reset the form fields
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        endTime: '',
        location: '',
        category: '',
        image: null,
        creator: 'Admin' // Reset creator
      });
      setError(null);
      // Show a success message
      toast.success('Event created successfully!');
    } catch (error) {
      // If there's an error, show an error message
      setError('Error submitting event: ' + error.message);
      toast.error('Error creating event. Please try again.');
    }
  };

  // Function runs when an input field is changed
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the state with the new input value
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Shows notifications */}
      <ToastContainer />
      {/* The form for creating a new event */}
      <form onSubmit={handleSubmit}>
        {/* If there's an error, display it here */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Input fields for event details */}
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
          type="time"
          name="endTime"
          value={newEvent.endTime}
          onChange={handleInputChange}
          placeholder="End Time"
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

// Define the prop types for the EventForm component
EventForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Export the EventForm component so it can be used in other parts of the app
export default EventForm;
