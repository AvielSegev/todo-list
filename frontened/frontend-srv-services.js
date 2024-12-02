import axios from 'axios';
import { serverBaseUrl } from '../client/src/config.js';

// Fetch todos
export const fetchTodos = async () => {
  const response = await axios.get(`${serverBaseUrl}/api/todos`);
  return response.data;
};

// Add a new todo
export const addTodo = async (text) => {
  const response = await axios.post(`${serverBaseUrl}/api/todos`, { text });
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${serverBaseUrl}/api/todos/${id}`);
  return response.data;
};

// Toggle completion status
export const toggleComplete = async (id) => {
  const response = await axios.patch(`${serverBaseUrl}/api/todos/${id}`);
  return response.data;
};
