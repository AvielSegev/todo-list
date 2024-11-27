import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const todo = todos.find(todo => todo.id === id);
      const updateURL = serverBaseUrl + `/${id}`;
      const updatedTodo = await axios.patch(updateURL);
      setTodos(todos.map(t => (t.id === id ? updatedTodo.data : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add new todo" 
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
