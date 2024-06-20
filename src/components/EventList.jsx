// Importing React and some other tools needed
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem.jsx';
import API from '../utils/api';

// This is the EventList component, it shows a list of events
function EventList({ events, dispatch }) {
  // useEffect runs when the component mounts
  useEffect(() => {
    // Async function to get all events from the API
    const fetchEvents = async () => {
      try {
        // Making an API call to get the list of events
        const response = await API.get('/events');
        // If the call is successful, update the state with the events
        dispatch({ type: 'SET_EVENTS', payload: response.data });
      } catch (error) {
        // If there is an error, log it to the console
        console.error('Error fetching events:', error);
      }
    };

    // Call the function to fetch the events
    fetchEvents();
  }, [dispatch]); // This array makes sure useEffect runs only once when the component mounts

  // Return a list of EventItem components
  return (
    <ul className="event-list">
      {events.map(event => (
        // Create an EventItem for each event
        <EventItem key={event._id} event={event} dispatch={dispatch} />
      ))}
    </ul>
  );
}

// Define the prop types for the EventList component
EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Export the EventList component so it can be used in other parts of the app
export default EventList;
