
import { fetchTodos, addTodo, deleteTodo, toggleComplete } from './frontend-srv-services.js';
import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler for other requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Get all todos
app.get('/all', (req, res) => {
    const response = fetchTodos()
    res.json(response);
});

// Create a new todo
app.post('/newtodo', (req, res) => {
    const { text } = req.body;
    const response = addTodo(text)
    res.json(response);
});

// Delete a todo
app.delete('/deletetodo/:id', (req, res) => {
    const response = deleteTodo(req.params.id)
    res.json(response);
});

// Toggle todo completion
app.patch('/patchtodo/:id', (req, res) => {
    const response = toggleComplete(req.params.id)
    res.json(response);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`frontened is running on port ${PORT}`);
});



