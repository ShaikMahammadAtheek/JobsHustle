const mongoose = require('mongoose');

// Job Description Schema
const jobDescriptionSchema = new mongoose.Schema({
  workplaceType: { type: String, required: true },
  location: { type: String, required: true },
  positionTitle: { type: String, required: true },
  jobFunction: { type: String, required: true },
  jobType: { type: String, required: true },  // Type: Off-Campus, Internship, Fresher, Experience
  minEducation: { type: String, required: true },
  mainStream: { type: String, required: true },
  minExperience: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  qualifications: [{ type: String }],
  benefits: [{ type: String }]
});

// Main Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  jobRole: { type: String },
  qualification: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  vacancies: { type: String },
  salary: { type: String },
  jobLocation: { type: String },
  venueLocation: { type: String },
  walkInDate: { type: String },
  eligibility: { type: String },
  postedDate: { type: String, required: true },
  jobType: { type: String, required: true },  // Added this field for job types (Off-Campus, Internship, etc.)
  jobDescription: jobDescriptionSchema,
  posted: { type: String, required: true },
  applyNowLink: { type: String },  // Field for "Apply Now" link
}, { timestamps: true });

// Export Job model
module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);


//latest code ...............

/*
const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema({
  workplaceType: { type: String, required: true },
  location: { type: String, required: true },
  positionTitle: { type: String, required: true },
  jobFunction: { type: String, required: true },
  jobType: { type: String, required: true },
  minEducation: { type: String, required: true },
  mainStream: { type: String, required: true },
  minExperience: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  qualifications: [{ type: String }],
  benefits: [{ type: String }]
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  jobRole: { type: String },
  qualification: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  vacancies: { type: String },
  salary: { type: String },
  jobLocation: { type: String },
  venueLocation: { type: String },
  walkInDate: { type: String },
  eligibility: { type: String },
  postedDate: { type: String, required: true },
  jobDescription: jobDescriptionSchema,
  posted: { type: String, required: true },
  applyNowLink: { type: String }  // Field for "Apply Now" link
}, { timestamps: true });

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
*/





/*
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  jobType: { type: String, required: true },
  imageUrl: { type: String, default: 'https://example.com/default-image.jpg' }, // Default image if not provided
  jobRole: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  vacancies: { type: Number, required: true, default: 1 }, // Default vacancies is 1
  salary: { type: String, required: true },
  jobLocation: { type: String, required: true },
  venueLocation: String, // Optional field
  walkInDate: Date, // Optional field
  eligibility: String, // Optional field
  applyNowLink: { type: String, required: true },
  jobDescription: {
    workplaceType: String, // e.g., Remote, Hybrid, On-site
    location: String,
    positionTitle: String,
    jobFunction: String,
    jobType: String // e.g., Full-time, Part-time
    // Add more nested fields as needed
  }
}, { timestamps: true }); // Enable timestamps

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

*/