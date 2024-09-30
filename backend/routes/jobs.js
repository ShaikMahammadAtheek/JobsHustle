const router = require('express').Router();
let Job = require('../models/Job');

// Get all jobs
router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new job
router.route('/add').post((req, res) => {
    const companyName = req.body.companyName;
    const jobTitle = req.body.jobTitle;
    const jobDescription = req.body.jobDescription;
    const companyImage = req.body.companyImage;
    const applyLink = req.body.applyLink;

    const newJob = new Job({ companyName, jobTitle, jobDescription, companyImage, applyLink });

    newJob.save()
        .then(() => res.json('Job added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a job by ID
router.route('/:id').get((req, res) => {
    Job.findById(req.params.id)
        .then(job => res.json(job))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
