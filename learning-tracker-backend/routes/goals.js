const express = require('express');
const router = express.Router();

// Placeholder route so file is a valid router
router.get('/', (req, res) => {
  res.json({ message: 'Goals API route working!' });
});

module.exports = router;
