import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session-like data from localStorage
    localStorage.removeItem('authToken'); // Remove user token
    localStorage.removeItem('adminToken'); // Remove admin token

    // Redirect to login page with a message
    navigate('/login', { state: { message: 'logged_out' } });
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
