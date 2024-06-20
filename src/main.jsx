// Importing necessary tools and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

// Rendering the main application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the app in BrowserRouter to enable routing */}
    <BrowserRouter>
      {/* Wrapping the app in AuthProvider to manage authentication state */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
