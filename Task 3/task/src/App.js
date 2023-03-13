import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">User Directory</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="px-4 py-2 border-2 border-blue-500 rounded-lg w-80"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-blue-500">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-white bg-blue-500 uppercase border-b border-gray-600">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="cursor-pointer hover:bg-gray-200"
              >
                <td className="px-4 py-4 border">{user.id}</td>
                <td className="px-4 py-4 border">{user.name}</td>
                <td className="px-4 py-4 border">{user.username}</td>
                <td className="px-4 py-4 border">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
