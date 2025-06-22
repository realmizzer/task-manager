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

const getErrorMessage = (title, message) => {
  return {
    error: title,
    message,
  }
}

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
// todo: pagination
app.get('/api/tasks', async (req, res) => {
  try {
    const filters = typeof req.query.filters === 'string'
      ? req.query.filters.split(',')
      : [];

    const filter = {};

    if (filters?.includes('important')) {
      filter.isImportant = true;
    }

    if (filters?.includes('uncompleted')) {
      filter.isCompleted = false;
    }

    const tasks = await Task.find(filter)
      .sort({isImportant: -1, createdAt: 1});

    res.json(tasks);

  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Get only important tasks
app.get('/api/tasks/important', async (req, res) => {
  const tasks = await Task.find({isImportant: true});
  res.send(tasks);
});

// Get an additional info about tasks
app.get('/api/tasks/info', async (req, res) => {
  const importantTasks = await Task.find({isImportant: true});
  const uncompletedTasks = await Task.find({isCompleted: false});
  res.send({
    importantTasksCount: importantTasks.length,
    uncompletedTasksCount: uncompletedTasks.length,
  });
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const {title, description, until, isImportant, isCompleted} = req.body;

  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return res
      .status(400)
      .json(getErrorMessage(
        'Validation Error',
        'No Title field'
      ));
  }

  const task = new Task({
    title: trimmedTitle,
    description: description ?? '',
    createdAt: Date.now(),
    until,
    isImportant: isImportant || false,
    isCompleted: isCompleted || false
  });

  await task.validate();
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
