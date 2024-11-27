import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [serverBaseUrl, setServerBaseUrl] = useState(''); // Added state for server URL input
  const [isConnected, setIsConnected] = useState(false); // To track if the connection is successful
  const [errorMessage, setErrorMessage] = useState(''); // For handling connection errors

  // Fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await axios.get(serverBaseUrl);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setErrorMessage('Failed to fetch todos from the server. Please check the URL or server.');
    }
  };

  // Handle the server connection check
  const handleConnect = async () => {
    if (serverBaseUrl.trim()) {
      try {
        const response = await axios.get(`${serverBaseUrl}/api/todos`);
        if (response.status === 200) {
          setIsConnected(true);
          setErrorMessage(''); // Clear error message if connection is successful
          fetchTodos(); // Fetch todos after successful connection
        }
      } catch (error) {
        setIsConnected(false);
        setErrorMessage('Unable to connect to the server. Please check the URL.');
      }
    } else {
      setErrorMessage('Please enter a valid server URL.');
    }
  };

  // Create a new todo
  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await axios.post(serverBaseUrl, { text: newTodo });
        setTodos([...todos, response.data]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      const deleteUrl = serverBaseUrl + `/${id}`;
      await axios.delete(deleteUrl);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Toggle todo completion
  const handleToggleComplete = async (id) => {
    try {
      const updateURL = serverBaseUrl + `/${id}`;
      const updatedTodo = await axios.patch(updateURL);
      setTodos(todos.map(t => (t.id === id ? updatedTodo.data : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="app-container">
      {/* Connection Section */}
      {!isConnected ? (
        <div className="connection-container">
          <h1 className="app-title">Connect to Server</h1>
          <input
            type="text"
            placeholder="e.g., http://localhost:5000"
            className="server-input"
            value={serverBaseUrl}
            onChange={(e) => setServerBaseUrl(e.target.value)}
          />
          <button onClick={handleConnect} className="connect-btn">Connect</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      ) : (
        // Todo List Section
        <div className="todo-container">
          <h1 className="app-title">Todo List</h1>
          <div className="input-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new todo"
              className="todo-input"
            />
            <button onClick={handleAddTodo} className="add-btn">Add</button>
          </div>

          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <span
                  className={`todo-text ${todo.completed ? 'completed' : ''}`}
                  onClick={() => handleToggleComplete(todo.id)}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleDeleteTodo(todo.id)} className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
