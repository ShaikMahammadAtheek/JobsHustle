const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

// Route to get Experience jobs
router.get('/', async (req, res) => {
    try {
        const experienceJobs = await Job.find({ jobType: 'Experience' });
        res.json(experienceJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Experience jobs', error });
    }
});

module.exports = router;
