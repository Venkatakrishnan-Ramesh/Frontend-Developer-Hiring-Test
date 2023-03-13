import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Define actions
const UPDATE_USERS = 'UPDATE_USERS';
const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';

// Define initial state
const initialState = {
  users: [],
  searchTerm: '',
};

// Define reducer function
function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERS:
      return { ...state, users: action.payload };
    case UPDATE_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}

// Create store
const store = createStore(userReducer);

function App() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    // Fetch users and update store
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        store.dispatch({
          type: UPDATE_USERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // Unsubscribe from store changes
    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (event) => {
    // Update store with search term
    store.dispatch({
      type: UPDATE_SEARCH_TERM,
      payload: event.target.value,
    });
  };

  const filteredUsers = state.users.filter((user) =>
    user.name.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  return (
    <Provider store={store}>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">User Directory</h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            className="px-4 py-2 border-2 border-blue-500 rounded-lg w-80"
            placeholder="Search by name..."
            value={state.searchTerm}
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
                <tr key={user.id} className="cursor-pointer hover:bg-gray-200">
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
    </Provider>
  );
}

export default App;
