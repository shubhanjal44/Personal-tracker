const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const authMiddleware = require('../middleware/auth');

// Get topics for a user (here, we'll simulate userId for now)
router.get('/', authMiddleware, async (req, res) => {
  // The user is authenticated, and we can access user ID via req.user.id
  const userId = req.user.id;
  const topics = await Topic.find({ userId });
  res.json(topics);
});

// Add a new topic
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // user ID from JWT token
    const { title, category, status, notes } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const newTopic = new Topic({ userId, title, category, status, notes });
    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update a topic by ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTopic) return res.status(404).json({ message: 'Topic not found' });
    res.json(updatedTopic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a topic by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Topic.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Topic not found' });
    res.json({ message: 'Topic deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
