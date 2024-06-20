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
      <div className="App-header">
        <img src={logo} className="App-logo" alt="Capsule Event Hub Logo" />
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/create">Create Event</Link></li>
            <li><Link to="/weather">Weather</Link></li> 
          </ul>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button">Register</Link>
          </div>
        </nav>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/events" element={<EventList events={events} dispatch={dispatch} />} />
        <Route path="/create" element={<EventForm dispatch={dispatch} />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<LoginForm dispatch={dispatch} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/weather" element={<WeatherForecast />} /> 
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
