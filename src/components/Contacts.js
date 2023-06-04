import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
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

        const response = await axios.get('http://localhost:3000/contacts', config);

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
      const response = await axios.post('http://localhost:3000/contacts', { name, email }, config);
      setContacts([...contacts, response.data]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='bg-gray-900 flex h-screen items-center justify-center'>
      <div className='p-8 bg-gray-300 m-4 max-w-md'>
        <h2 className='text-3xl bold font-bold text-center'>Contacts</h2>
        <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              <p className='bg-gray-200 p-2 m-2'>Name: {contact.name}</p>
              <p className='bg-gray-200 p-2 m-2'>Email: {contact.email}</p>
              <p className='bg-gray-200 p-2 m-2'>Phone: {contact.phone}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
