//latest code ...............
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
  title: { type: String, required: true, index: true },  // Indexed for faster title searches
  company: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+$/.test(v);  // Validate as a URL
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  jobRole: { type: String },
  qualification: { type: String, required: true },
  location: { type: String, required: true, index: true },  // Indexed for faster location-based queries
  experience: { type: String, required: true },
  vacancies: { type: String, default: null },  // Optional
  salary: { type: String, default: null },     // Optional
  jobLocation: { type: String },
  venueLocation: { type: String },
  walkInDate: { type: Date, default: null },   // Use Date type for consistency
  eligibility: { type: String },
  postedDate: { type: Date, required: true, index: true },  // Use Date type for consistency and index for faster date-based queries
  jobType: { type: String, required: true, index: true },  // Indexed for faster job type queries
  jobDescription: jobDescriptionSchema,
  posted: { type: String, required: true },
  applyNowLink: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+$/.test(v);  // Validate as a URL
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create indexes for faster queries
jobSchema.index({ jobType: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ postedDate: -1 });
jobSchema.index({ title: 'text', description: 'text' });  // Enable text search on title and description

// Export Job model
module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);





//Main Code

/*const mongoose = require('mongoose');

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

*/
