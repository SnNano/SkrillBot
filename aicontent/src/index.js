import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/css/output.css";
import "./assets/css/custom.css";
import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <App />
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
