import { useReducer } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import EventList from './components/EventList.jsx';
import EventForm from './components/EventForm.jsx';
import EventDetails from './components/EventDetails.jsx'; 
import Home from './components/Home.jsx'; 
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
    // <Router>
      <div className="App">
        <div className="App-header">
          <img src="/src/assets/capsule-logo.png" className="App-logo" alt="Capsule Event Hub Logo" />
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/create">Create Event</Link></li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/events" element={<EventList events={events} dispatch={dispatch} />} />
          <Route path="/create" element={<EventForm dispatch={dispatch} />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
    // </Router>
  );
}

export default App;
