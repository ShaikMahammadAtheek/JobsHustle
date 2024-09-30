const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

// Route to get Job by City jobs
router.get('/', async (req, res) => {
    try {
        const jobByCityJobs = await Job.find({ jobType: 'Job by City' });
        res.json(jobByCityJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Job by City jobs', error });
    }
});

module.exports = router;
