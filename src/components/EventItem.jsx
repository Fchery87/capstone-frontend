import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import API from '../utils/api';

function EventItem({ event, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) return; // Prevent duplicate save attempts
    setIsSaving(true);
    try {
      const response = await API.put(`/events/${event._id}`, editedEvent);
      dispatch({ type: 'EDIT_EVENT', payload: response.data });
      setIsEditing(false);
      toast.success('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Error updating event. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/events/${event._id}`);
      dispatch({ type: 'DELETE_EVENT', payload: event._id });
      toast.success('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options).toUpperCase();
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleInputChange}
            placeholder="Event Title"
            required
          />
          <textarea
            name="description"
            value={editedEvent.description}
            onChange={handleInputChange}
            placeholder="Event Description"
            required
          />
          <input
            type="date"
            name="date"
            value={editedEvent.date.split('T')[0]}
            onChange={handleInputChange}
            required
          />
          <input
            type="time"
            name="time"
            value={editedEvent.time}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location"
            value={editedEvent.location}
            onChange={handleInputChange}
            placeholder="Event Location"
            required
          />
          <input
            type="text"
            name="category"
            value={editedEvent.category}
            onChange={handleInputChange}
            placeholder="Event Category"
            required
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{editedEvent.title}</h3>
          <p>{editedEvent.description}</p>
          <p>{`${formatDate(editedEvent.date)} · ${formatTime(editedEvent.time)}`}</p>
          <p>Location: {editedEvent.location}</p>
          <p>Category: {editedEvent.category}</p>
          {editedEvent.imageUrl && <img src={editedEvent.imageUrl} alt={editedEvent.title} />}
          <div className="buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

EventItem.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default EventItem;
