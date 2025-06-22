const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// === SCHEMAS  ===
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Number,
  until: Number,
  isImportant: Boolean,
  isCompleted: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// === ROUTES ===

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Get only an important task
app.get('/api/tasks/important', async (req, res) => {
  const tasks = await Task.find({isImportant: true});
  res.send(tasks);
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    createdAt: Date.now(),
    until: req.body.until,
    isImportant: req.body.isImportant || false,
    isCompleted: req.body.isCompleted || false
  });

  await task.save();
  res.send(task);
});

// Update the task
app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    until: req.body.until,
    isImportant: req.body.isImportant,
    isCompleted: req.body.isCompleted,
  }, {new: true});

  res.send(task);
});

// Delete the task
app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({message: 'Task deleted'});
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
