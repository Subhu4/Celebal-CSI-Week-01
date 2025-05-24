import './styles.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div>No data submitted. <button onClick={() => navigate('/')}>Back</button></div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Submission Successful!</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Back to Form</button>
    </div>
  );
};

export default SuccessPage;