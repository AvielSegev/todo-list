import axios from 'axios';
import { frontendBaseUrl } from './config.js';

// Fetch todos
export const fetchTodos = async () => {
  const response = await axios.get(`${frontendBaseUrl}/all`);
  return response.data;
};

// Add a new todo
export const addTodo = async (text) => {
  const response = await axios.post(`${frontendBaseUrl}/newtodo`, { text });
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${frontendBaseUrl}/deletetodo/${id}`);
};

// Toggle completion status
export const toggleComplete = async (id) => {
  const response = await axios.patch(`${frontendBaseUrl}/patchtodo/${id}`);
  return response.data;
};
