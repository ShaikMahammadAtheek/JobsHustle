const express = require('express');
const router = express.Router();
const Job = require('../models/job.model'); // Import the Job model

// Get all Off Campus jobs
router.get('/', async (req, res) => {
    try {
        const offCampusJobs = await Job.find({ jobType: 'Off Campus' }); // Fetch jobs with jobType 'Off Campus'
        res.json(offCampusJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching off-campus jobs', error });
    }
});

module.exports = router;
