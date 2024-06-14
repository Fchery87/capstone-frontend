import { useReducer, useEffect } from 'react';
import EventList from './components/EventList.jsx';
import EventForm from './components/EventForm.jsx';
import './App.css';

const initialState = [];

function eventReducer(state, action) {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload;
    case 'ADD_EVENT':
      return [action.payload, ...state];
    case 'EDIT_EVENT':
      return state.map(event =>
        event._id === action.payload._id ? action.payload : event
      );
    case 'DELETE_EVENT':
      return state.filter(event => event._id !== action.payload);
    default:
      return state;
  }
}

function App() {
  const [events, dispatch] = useReducer(eventReducer, initialState);

  return (
    <div className="App">
      <h1>EventHub</h1>
      <EventForm dispatch={dispatch} />
      <EventList events={events} dispatch={dispatch} />
    </div>
  );
}

export default App;
