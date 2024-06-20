// Importing necessary tools and components
import { useReducer } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventList from './components/EventList.jsx';
import EventForm from './components/EventForm.jsx';
import EventDetails from './components/EventDetails.jsx'; 
import Home from './components/Home.jsx'; 
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import WeatherForecast from './components/WeatherForecast.jsx';
import logo from './assets/capsule-logo-1.png';
import './App.css';

// Initial state for events
const initialState = [];

// Reducer function to manage events state
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

// Main App component
function App() {
  // Using useReducer to manage the events state
  const [events, dispatch] = useReducer(eventReducer, initialState);

  return (
    <div className="App">
      {/* Header with navigation and logo */}
      <div className="App-header">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/create">Create Event</Link></li>
            <li><Link to="/weather">Weather</Link></li>
          </ul>
        </nav>
        <img src={logo} className="App-logo" alt="Capsule Event Hub Logo" />
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/register" className="auth-button">Register</Link>
        </div>
      </div>
      {/* Routes to different components/pages */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/events" element={<EventList events={events} dispatch={dispatch} />} />
        <Route path="/create" element={<EventForm dispatch={dispatch} />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<LoginForm dispatch={dispatch} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/weather" element={<WeatherForecast />} /> 
      </Routes>
      {/* ToastContainer to show notifications */}
      <ToastContainer />
    </div>
  );
}

// Export the App component so it can be used in other parts of the app
export default App;
