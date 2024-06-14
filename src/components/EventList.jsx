import { useEffect } from 'react';
import EventItem from './EventItem.jsx';
import API from '../utils/api';

function EventList({ events, dispatch }) {
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get('/events');
        dispatch({ type: 'SET_EVENTS', payload: response.data });
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [dispatch]);

  return (
    <ul>
      {events.map(event => (
        <EventItem key={event._id} event={event} dispatch={dispatch} />
      ))}
    </ul>
  );
}

export default EventList;
