import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const serverBaseUrl = 'http://localhost:5000/api/todos';

  // Fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await axios.get(serverBaseUrl);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
  );
};

export default App;
