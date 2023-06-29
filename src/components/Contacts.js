import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Set the Authorization header with the JWT token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('https://backend-for-contactlistapp-production.up.railway.app/contacts', config);

        // Update contacts state with the data received
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error
        if (error.response && error.response.status === 403) {
          setError('Forbidden: You do not have permission to access this resource.');
        } else {
          setError('An error occurred while fetching data.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddContact = async (event) => {
    event.preventDefault();

    try {

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('https://backend-for-contactlistapp-production.up.railway.app/contacts', { name, email, phone }, config);
      setContacts([...contacts, response.data]);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`https://backend-for-contactlistapp-production.up.railway.app/contacts/${id}`, config);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleUpdateContact = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`https://backend-for-contactlistapp-production.up.railway.app/contacts/${id}`, { name, email, phone }, config);
      setContacts(contacts.map((contact) => (contact._id === id ? response.data : contact)));
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };



  if (loading) {
    return <div className='text-3xl font-semibold text-center'>Loading...</div>;
  }

  if (error) {
    return <div className='text-3xl font-semibold text-center'>{error}</div>;
  }

  return (
    <div className='bg-gray-900 flex h-screen items-center justify-center'>
      <div className='p-8 bg-gray-300 m-4 max-w-md'>
        <h2 className='text-3xl bold font-bold text-center'>Contacts</h2>
        <div>
          <input
            type="text"
            className='bg-gray-200 p-2 m-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input type="tel"
            className='bg-gray-200 p-2 m-2'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone'
          />
          <input
            type="email"
            className='bg-gray-200 p-2 m-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button onClick={handleAddContact} type='submit'>
            Add Contact
          </button>

        </div>
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              <p className='bg-gray-200 p-2 m-2'>Name: {contact.name}</p>
              <p className='bg-gray-200 p-2 m-2'>Email: {contact.email}</p>
              <p className='bg-gray-200 p-2 m-2'>Phone: {contact.phone}</p>
              <button className='bg-yellow-200 p-2 m-2' onClick={() => handleUpdateContact(contact._id)}>Edit</button>
              <button className='bg-red-600 p-2 m-2' onClick={() => handleDeleteContact(contact._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
