const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

// Route to get Fresher jobs
router.get('/', async (req, res) => {
    try {
        const fresherJobs = await Job.find({ jobType: 'Fresher' });
        res.json(fresherJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Fresher jobs', error });
    }
});

module.exports = router;
