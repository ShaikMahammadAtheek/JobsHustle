const express = require('express');
const Job = require('../models/job.model');
const router = express.Router();

// Get job details by ID
router.get('/api/home/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job details' });
  }
});

module.exports = router;
