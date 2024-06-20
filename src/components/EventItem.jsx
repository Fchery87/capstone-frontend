// Importing tools from React and other libraries needed
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import API from '../utils/api';
import '../styling/EventItem.css'; // Import the new CSS file

// The EventItem component shows and lets us edit or delete an event
function EventItem({ event, dispatch }) {
  // Using state to keep track if we are editing the event
  const [isEditing, setIsEditing] = useState(false);
  // Using state to keep track of the edited event details
  const [editedEvent, setEditedEvent] = useState({ ...event });
  // Using state to keep track of a new image if one is added
  const [newImage, setNewImage] = useState(null);
  // Using state to prevent duplicate save attempts
  const [isSaving, setIsSaving] = useState(false);

  // Function runs when saving the edited event
  const handleSave = async () => {
    if (isSaving) return; // Prevent duplicate save attempts
    setIsSaving(true);

    try {
      // Prepare the form data to send to the server
      const formData = new FormData();
      for (const key in editedEvent) {
        formData.append(key, editedEvent[key]);
      }
      if (newImage) {
        formData.append('image', newImage);
      }

      // Make an API call to update the event
      const response = await API.put(`/events/${event._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // If successful, update the state with the edited event
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

  // Function runs when deleting the event
  const handleDelete = async () => {
    try {
      // Make an API call to delete the event
      await API.delete(`/events/${event._id}`);
      // If successful, update the state to remove the event
      dispatch({ type: 'DELETE_EVENT', payload: event._id });
      toast.success('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event. Please try again.');
    }
  };

  // Function runs when an input field is changed
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the state with the new input value
    setEditedEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  // Function runs when a new image file is selected
  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Function formats the event date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options).toUpperCase();
  };

  // Function formats the event time
  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <li className="event-item">
      {isEditing ? (
        <>
          {/* Input fields for editing the event details */}
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
            type="time"
            name="endTime"
            value={editedEvent.endTime || ''}
            onChange={handleInputChange}
            placeholder="End Time"
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
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <div className="event-item-content">
          {/* Display the event details */}
          <div className="event-details">
            <h3>{editedEvent.title}</h3>
            <p>{editedEvent.description}</p>
            <p>{`${formatDate(editedEvent.date)} · ${formatTime(editedEvent.time)}${editedEvent.endTime ? ` - ${formatTime(editedEvent.endTime)}` : ''}`}</p>
            <p>Location: {editedEvent.location}</p>
            <p>Category: {editedEvent.category}</p>
          </div>
          {editedEvent.imageUrl && <img src={editedEvent.imageUrl} alt={editedEvent.title} className="event-image" />}
          <div className="buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
}

// Define the prop types for the EventItem component
EventItem.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    endTime: PropTypes.string,
    location: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Export the EventItem component so it can be used in other parts of the app
export default EventItem;
