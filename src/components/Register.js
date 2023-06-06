import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post('https://backend-for-contactlistapp-production.up.railway.app/register', {
        username,
        password,
      });

      // Handle successful registration
      console.log(response.data);
      setSuccess('Registration successful. Please login.');
      setError('');
    } catch (error) {
      // Handle registration error
      console.error(error);
      setSuccess('');
      setError('Error registering. Please try again.');
    }
  };

  return (
    <div className='bg-gray-900 flex h-screen items-center justify-center'>
      <div className='p-8 bg-gray-300 m-4 max-w-md'>
        <h2 className='text-3xl bold font-bold text-center'>REGISTER</h2>
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
          <button type="submit" className='rounded bg-red-200 m-2 p-2'>Register</button>
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
          <Link to='/login' className='text-center text-blue-500'>Already have an account? Login here.</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
