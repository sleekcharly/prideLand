// import react and RaectDOM
import React from 'react';
import ReactDOM from 'react-dom';
// import react-router
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';

ReactDOM.render(
  // wrap entire application with Router
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
