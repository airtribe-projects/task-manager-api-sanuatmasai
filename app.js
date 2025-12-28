const express = require('express');
const { GetAllTasks, GetTaskById, CreateNewTask, UpdateTask, DeleteTask, GetTasksByPriority } = require('./Controllers/TaskController');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tasks', GetAllTasks)

app.get('/tasks/:id', GetTaskById)

app.post('/tasks', CreateNewTask)

app.put('/tasks/:id', UpdateTask)

app.delete('/tasks/:id', DeleteTask)

app.get('/tasks/priority/:level', GetTasksByPriority)

module.exports = app;