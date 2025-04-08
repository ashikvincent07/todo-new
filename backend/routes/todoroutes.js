const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  const { description, status } = req.body;
  try {
    const newTodo = new Todo({
      description,
      status,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a todo's status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});



module.exports = router;
