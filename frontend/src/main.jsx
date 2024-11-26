import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Ensure BrowserRouter is correctly imported
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* BrowserRouter should wrap App */}
    <App />
  </BrowserRouter>
);
