const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

// Route to get Support jobs
router.get('/', async (req, res) => {
    try {
        const supportJobs = await Job.find({ jobType: 'Support' });
        res.json(supportJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Support jobs', error });
    }
});

module.exports = router;
