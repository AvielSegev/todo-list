import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, deleteTodo, toggleComplete } from './apiService';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodosData();
  }, []);

  const fetchTodosData = async () => {
    try {
      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const todo = await addTodo(newTodo);
        setTodos([...todos, todo]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const updatedTodo = await toggleComplete(id);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  return (
    <div className="todo-container app-container">
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
