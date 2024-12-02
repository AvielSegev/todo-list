import axios from 'axios';
import { clientBaseUrl } from './config';

// Fetch todos
export const fetchTodos = async () => {
  const response = await axios.get(`${clientBaseUrl}/all`);
  return response.data;
};

// Add a new todo
export const addTodo = async (text) => {
  const response = await axios.post(`${clientBaseUrl}/newtodo`, { text });
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${clientBaseUrl}/deletetodo/${id}`);
};

// Toggle completion status
export const toggleComplete = async (id) => {
  const response = await axios.patch(`${clientBaseUrl}/patchtodo/${id}`);
  return response.data;
};
