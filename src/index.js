// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // Import your global styles
import App from './App';
import Home from './Home';
import About from './About';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router>
        <Home />
        <App />
        <About/>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
