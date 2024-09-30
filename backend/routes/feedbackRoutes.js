const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST route to store feedback
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newFeedback = new Feedback({
      name,
      email,
      message
    });

    await newFeedback.save();
    res.status(200).json({ success: true, message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting feedback' });
  }
});

module.exports = router;
