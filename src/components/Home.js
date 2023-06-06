import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/contacts');
    } else {
      navigate('/login');
    }
  }, [navigate, isLoggedIn]);

  return null; // or any other content you want to display on the home page
};

export default Home;
