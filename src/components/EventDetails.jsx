/* eslint-disable react/prop-types */
// Importing tools from React and an API helper function
import { useEffect, useState } from 'react';
import API from '../utils/api';

// The EventDetails component, it gets some data from its parent component
const EventDetails = ({ match }) => {
  // Using state to keep track of the event details
  const [event, setEvent] = useState(null);

  // useEffect runs when the component mounts and whenever the event ID changes
  useEffect(() => {
    // Async function to get event details from the API
    const fetchEvent = async () => {
      try {
        // Making an API call to get the event details using the event ID
        const response = await API.get(`/events/${match.params.id}`);
        // If the call is successful, save the event details in the state
        setEvent(response.data);
      } catch (error) {
        // If there is an error, log it to the console
        console.error('Error fetching event:', error);
      }
    };

    // Call the function to fetch the event details
    fetchEvent();
  }, [match.params.id]); // This array makes sure useEffect runs again if the event ID changes

  // If the event data isn't loaded yet, show a loading message
  if (!event) {
    return <p>Loading...</p>;
  }

  // Once the event data is loaded, display it on the screen
  return (
    <div>
      <h2>{event.title}</h2> {/* Display the event title */}
      <p>{event.description}</p> {/* Display the event description */}
      <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p> {/* Display the event date and time */}
      <p>Location: {event.location}</p> {/* Display the event location */}
      <p>Category: {event.category}</p> {/* Display the event category */}
      {event.imageUrl && <img src={event.imageUrl} alt={event.title} />} {/* If there's an image, display it */}
    </div>
  );
};

// Export the EventDetails component so it can be used in other parts of the app
export default EventDetails;
