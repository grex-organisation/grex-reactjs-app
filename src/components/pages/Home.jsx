import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {isAuthenticated } from '../../services/JWTService'
import Header from '../Header';

const Home = () => {
  
  const navigate = useNavigate();
  const location = useLocation();


  // Redirect based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to dashboard if authenticated
    } else if (location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login'); // Redirect to login if unauthenticated and not already on login/signup
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <div>
    
    </div>
  );
};

export default Home;
