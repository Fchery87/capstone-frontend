import { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.category) {
      alert('Please fill in all fields.');
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
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        placeholder="Event Title"
        required
      />
      <textarea
        value={newEvent.description}
        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        placeholder="Event Description"
        required
      />
      <input
        type="date"
        value={newEvent.date}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        required
      />
      <input
        type="time"
        value={newEvent.time}
        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        required
      />
      <input
        type="text"
        value={newEvent.location}
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        placeholder="Event Location"
        required
      />
      <input
        type="text"
        value={newEvent.category}
        onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
        placeholder="Event Category"
        required
      />
      <input
        type="file"
        onChange={(e) => setNewEvent({ ...newEvent, image: e.target.files[0] })}
      />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;
