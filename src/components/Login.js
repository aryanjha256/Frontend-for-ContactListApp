import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      localStorage.setItem('token', response.data.token);

      // Handle successful login
      console.log(response.data);

      // Redirect to contacts page
      navigate('/contacts');
    } catch (error) {
      // Handle login error
      console.error(error);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className='bg-gray-900 flex h-screen items-center justify-center'>
      <div className='p-8 bg-gray-300 m-4 max-w-md'>
        <h2 className='text-3xl bold font-bold text-center'>LOGIN</h2>
        <form onSubmit={handleSubmit} className='py-8 flex flex-col'>
          <input
            className='bg-gray-200 p-2 m-2'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='bg-gray-200 p-2 m-2'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='rounded bg-red-200 m-2 p-2'>Login</button>
          {error && <p className='text-red-500'>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
