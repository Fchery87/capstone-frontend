import { useState } from 'react';

function EventItem({ event, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleSave = () => {
    dispatch({ type: 'EDIT_EVENT', payload: editedEvent });
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedEvent.title}
            onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
            placeholder="Event Title"
            required
          />
          <textarea
            value={editedEvent.description}
            onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
            placeholder="Event Description"
            required
          />
          <input
            type="date"
            value={editedEvent.date}
            onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={editedEvent.time}
            onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
            required
          />
          <input
            type="text"
            value={editedEvent.location}
            onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
            placeholder="Event Location"
            required
          />
          <input
            type="text"
            value={editedEvent.category}
            onChange={(e) => setEditedEvent({ ...editedEvent, category: e.target.value })}
            placeholder="Event Category"
            required
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.date} at {event.time}</p>
          <p>Location: {event.location}</p>
          <p>Category: {event.category}</p>
          {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
          <div className="buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button
              onClick={() => dispatch({ type: 'DELETE_EVENT', payload: event.id })}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default EventItem;
