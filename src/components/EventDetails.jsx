import { useEffect, useState } from 'react';
import API from '../utils/api';

const EventDetails = ({ match }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await API.get(`/events/${match.params.id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [match.params.id]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Category: {event.category}</p>
      {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
    </div>
  );
};

export default EventDetails;
