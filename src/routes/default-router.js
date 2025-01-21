import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function DefaultRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={''} />
        <Route path="/login" element={''} />
      </Routes>
    </Router>
  );
}

export default DefaultRoute;
