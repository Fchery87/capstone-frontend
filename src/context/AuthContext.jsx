// Importing necessary tools from React and other libraries needed
import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../utils/api';

// Creating a context for authentication
const AuthContext = createContext();

// Reducer function to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Storing the token in local storage upon login
      localStorage.setItem('token', action.payload.token);
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      // Removing the token from local storage upon logout
      localStorage.removeItem('token');
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

// AuthProvider component to wrap around parts of the app that need authentication
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem('token'),
  });

  // useEffect to set or remove the token from API headers when the token state changes
  useEffect(() => {
    if (state.token) {
      API.defaults.headers.common['x-auth-token'] = state.token;
    } else {
      delete API.defaults.headers.common['x-auth-token'];
    }
  }, [state.token]);

  return (
    // Providing the state and dispatch to the rest of the app
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Defining prop types for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Exporting AuthContext and AuthProvider for use in other parts of the app
export { AuthContext, AuthProvider };
