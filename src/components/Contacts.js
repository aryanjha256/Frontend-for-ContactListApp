import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);


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

        const response = await axios.get('http://localhost:3000/contacts', config,);

        // Update contacts state with the data received
        setContacts(response.data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-gray-900 flex h-screen items-center justify-center'>
      <div className='p-8 bg-gray-300 m-4 max-w-md'>
        <h2 className='text-3xl bold font-bold text-center'>Contacts</h2>
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
