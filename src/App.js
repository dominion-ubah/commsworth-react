import React from 'react';
import './App.css';
import {BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import SiteRoutes from 'routes/SiteRoutes/SiteRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
            <SiteRoutes />
          </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
