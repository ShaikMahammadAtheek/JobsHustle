const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

// Route to get Internship jobs
router.get('/', async (req, res) => {
    try {
        const internshipJobs = await Job.find({ jobType: 'Internship' });
        res.json(internshipJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Internship jobs', error });
    }
});

module.exports = router;
