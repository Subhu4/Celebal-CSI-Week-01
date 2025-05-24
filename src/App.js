import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import SuccessPage from './SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/post-successful-submission" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;