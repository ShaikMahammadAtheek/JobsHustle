const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');
const { promisify } = require('util');

// Initialize Redis client
const redisClient = redis.createClient();
const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

// Express app setup
const app = express();
const port = process.env.PORT || 5000;

// Import the Job model
const Job = require('./models/job.model');

// Middleware
app.use(cors({ origin: 'https://jobshustles.onrender.com' }));
app.use(express.json());
app.use(bodyParser.json());

// Add request timeout middleware (60 seconds timeout)
app.use((req, res, next) => {
  req.setTimeout(60000); // 60 seconds timeout
  next();
});

// MongoDB connection with connection pooling
const uri = 'mongodb+srv://mahammadatheek17:64CD3iWJIUMED24C@cluster0.rdkhg.mongodb.net/jobportal';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, // Increase the pool size for performance
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Redis connection handling
redisClient.on('error', (err) => console.log('Redis Client Error', err));
(async () => {
  try {
    await redisClient.connect(); // Connect to Redis server
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis', err);
  }
})();

// Middleware for paginating results
const paginate = (req) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  return { limit, skip };
};

// Cache middleware for Redis
const checkCache = async (req, res, next) => {
  const cachedData = await redisGetAsync(req.originalUrl);
  if (cachedData) {
    console.log('Cache hit');
    return res.json(JSON.parse(cachedData)); // Serve data from cache
  }
  console.log('Cache miss');
  next(); // Proceed to fetch from MongoDB
};

// Function to handle Redis caching and job fetching
const fetchJobsWithCache = async (req, res, jobType) => {
  const { limit, skip } = paginate(req);
  const cacheKey = `${jobType}Jobs`; // Unique cache key for each job type

  try {
    // Check if data is cached in Redis
    const cachedData = await redisGetAsync(cacheKey);
    if (cachedData) {
      console.log(`Serving ${jobType} jobs from Redis cache`);
      return res.json(JSON.parse(cachedData)); // Send cached data
    }

    // Fetch data from MongoDB if not in cache
    console.log('Cache miss');
    const jobs = await Job.find({ jobType }, 'title company location jobType postedDate')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Cache the result in Redis (set expiration to 60 seconds)
    await redisSetAsync(cacheKey, JSON.stringify(jobs), 'EX', 60);
    
    // Send the fetched data to the client
    res.json(jobs);
  } catch (error) {
    console.error(`Error fetching ${jobType} jobs`, error);
    res.status(500).json({ message: `Error fetching ${jobType} jobs`, error });
  }
};

// Route to fetch all jobs (with pagination) and display the newest ones first (for Home page)
app.get('/api/home', checkCache, async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const jobs = await Job.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Cache the result in Redis (cache for 1 hour)
    await redisSetAsync(req.originalUrl, JSON.stringify(jobs), 'EX', 3600);
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs', err);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Route to fetch job details by ID
app.get('/api/jobs/:id', checkCache, async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Job.findById(jobId).lean();
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Cache the result in Redis (cache for 1 hour)
    await redisSetAsync(req.originalUrl, JSON.stringify(job), 'EX', 3600);
    res.json(job);
  } catch (error) {
    console.error('Error fetching job details', error);
    res.status(500).json({ message: 'Error fetching job details' });
  }
});

// Route to fetch Off Campus jobs
app.get('/api/offcampus', (req, res) => {
  fetchJobsWithCache(req, res, 'OffCampus');
});

// Route to fetch Internship jobs
app.get('/api/internships', (req, res) => {
  fetchJobsWithCache(req, res, 'Internship');
});

// Route to fetch Fresher jobs
app.get('/api/freshers', (req, res) => {
  fetchJobsWithCache(req, res, 'Fresher');
});

// Route to fetch Experience jobs
app.get('/api/experience', (req, res) => {
  fetchJobsWithCache(req, res, 'Experience');
});

// Route to fetch distinct cities (for Job By City feature)
app.get('/api/cities', checkCache, async (req, res) => {
  try {
    const cities = await Job.find().distinct('location');
    await redisSetAsync(req.originalUrl, JSON.stringify(cities), 'EX', 3600);
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities', error);
    res.status(500).json({ message: 'Error fetching cities' });
  }
});

// Route to fetch jobs by city with pagination
app.get('/api/cities/:city', checkCache, async (req, res) => {
  const { limit, skip } = paginate(req);
  const city = req.params.city;

  try {
    const jobs = await Job.find({ location: city })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    await redisSetAsync(req.originalUrl, JSON.stringify(jobs), 'EX', 3600);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by city', error);
    res.status(500).json({ message: 'Error fetching jobs by city' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

















/*
//redis code


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');  // Redis client
const app = express();
const port = process.env.PORT || 5000;

// Import the Job model
const Job = require('./models/job.model');

// Middleware
app.use(cors({ origin: 'https://jobshustles.onrender.com' }));
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection with connection pooling
const uri = 'mongodb+srv://mahammadatheek17:64CD3iWJIUMED24C@cluster0.rdkhg.mongodb.net/jobportal';
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  poolSize: 10  // Increase the pool size to speed up multiple connections
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Redis client setup
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();  // Connect to Redis server
})();

// Utility function for pagination
const paginate = (req) => {
  const limit = parseInt(req.query.limit) || 10;  // Default limit: 10
  const page = parseInt(req.query.page) || 1;     // Default page: 1
  return { limit, skip: (page - 1) * limit };
};

// Middleware to check Redis cache
const checkCache = async (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = await redisClient.get(key);
  
  if (cachedData) {
    console.log('Cache hit');
    res.send(JSON.parse(cachedData));
  } else {
    console.log('Cache miss');
    next();  // Proceed to the next middleware if no cache is found
  }
};

// Route to fetch all jobs (with pagination) and display the newest ones first (for Home page)
app.get('/api/home', checkCache, async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();  // Use .lean()
    
    // Cache the result in Redis
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(jobs));  // Cache for 1 hour

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Route to fetch job details by ID
app.get('/api/home/:id', checkCache, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).lean();  // Use .lean()

    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }

    // Cache the result in Redis
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(job));  // Cache for 1 hour

    res.send(job);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching job details' });
  }
});

// Route to fetch Off Campus jobs (with pagination)
app.get('/api/offcampus', checkCache, async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const offCampusJobs = await Job.find({ jobType: 'OffCampus' }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();  // Use .lean()

    // Cache the result in Redis
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(offCampusJobs));  // Cache for 1 hour

    res.json(offCampusJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching OffCampus jobs', error });
  }
});

// Route to fetch Internship jobs (with pagination)
app.get('/api/internships', checkCache, async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const internshipJobs = await Job.find({ jobType: 'Internship' }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();  // Use .lean()

    // Cache the result in Redis
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(internshipJobs));  // Cache for 1 hour

    res.json(internshipJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Internship jobs', error });
  }
});

// Route to fetch Fresher jobs (with pagination)
app.get('/api/freshers', checkCache, async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const fresherJobs = await Job.find({ jobType: 'Fresher' }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();  // Use .lean()

    // Cache the result in Redis
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(fresherJobs));  // Cache for 1 hour

    res.json(fresherJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Fresher jobs', error });
  }
});

// Route to fetch Experience jobs (with pagination)
app.get('/api/experience', checkCache, async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const experienceJobs = await Job.find({ jobType: 'Experience' }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();  // Use .lean()

    // Cache the result in Redis
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(experienceJobs));  // Cache for 1 hour

    res.json(experienceJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Experience jobs', error });
  }
});

// Route to get distinct cities
app.get('/api/cities', checkCache, async (req, res) => {
  try {
    const cities = await Job.find().distinct('location');  // Fetch unique city names

    // Cache the result in Redis
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(cities));  // Cache for 1 hour

    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get jobs by city (with pagination)
app.get('/api/job-by-city/:city', checkCache, async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const city = req.params.city;
    const jobs = await Job.find({ location: city }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();  // Use .lean()

    // Cache the result in Redis
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(jobs));  // Cache for 1 hour

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs by city' });
  }
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
*/








/*
//latest Code

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// Import the Job model
const Job = require('./models/job.model');

// Middleware
app.use(cors({ origin: 'https://jobshustles.onrender.com' }));
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection with connection pooling
const uri = 'mongodb+srv://mahammadatheek17:64CD3iWJIUMED24C@cluster0.rdkhg.mongodb.net/jobportal';
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  maxPoolSize: 10  // Use 'maxPoolSize' instead of 'poolSize'
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Middleware for MongoDB query performance
Job.createIndexes({ jobType: 1, location: 1, createdAt: -1 });  // Create necessary indexes

// Utility function for pagination
const paginate = (req) => {
  const limit = parseInt(req.query.limit) || 10;  // Default limit: 10
  const page = parseInt(req.query.page) || 1;     // Default page: 1
  return { limit, skip: (page - 1) * limit };
};

// Route to fetch all jobs (with pagination) and display the newest ones first (for Home page)
app.get('/api/home', async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Route to fetch job details by ID
app.get('/api/home/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }
    res.send(job);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching job details' });
  }
});

// Route to fetch Off Campus jobs (with pagination)
app.get('/api/offcampus', async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const offCampusJobs = await Job.find({ jobType: 'OffCampus' }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(offCampusJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching OffCampus jobs', error });
  }
});

// Route to fetch Internship jobs (with pagination)
app.get('/api/internships', async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const internshipJobs = await Job.find({ jobType: 'Internship' }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(internshipJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Internship jobs', error });
  }
});

// Route to fetch Fresher jobs (with pagination)
app.get('/api/freshers', async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const fresherJobs = await Job.find({ jobType: 'Fresher' }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(fresherJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Fresher jobs', error });
  }
});

// Route to fetch Experience jobs (with pagination)
app.get('/api/experience', async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const experienceJobs = await Job.find({ jobType: 'Experience' }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(experienceJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Experience jobs', error });
  }
});

// Route to get distinct cities
app.get('/api/cities', async (req, res) => {
  try {
    const cities = await Job.find().distinct('location');  // Fetch unique city names
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get jobs by city (with pagination)
app.get('/api/job-by-city/:city', async (req, res) => {
  const { limit, skip } = paginate(req);
  try {
    const city = req.params.city;
    const jobs = await Job.find({ location: city }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs by city' });
  }
});

// Route for feedback submission (POST)
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    // Email validation logic can be added here
    const isEmailValid = true;  // Assume the email is valid for this example
    if (!isEmailValid) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Feedback model logic goes here (save feedback to the database)
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
});

// Route for notifications (GET)
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = [];  // Fetch your notifications data from the database here
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
*/






//Main code

/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/jobRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const app = express();
const port = process.env.PORT || 5000;

// Import the Job model
const Job = require('./models/job.model');

// Middleware
// app.use(cors());
app.use(cors({ origin: 'https://jobshustles.onrender.com' }));
app.use(express.json());
app.use(bodyParser.json());


// const uri = 'mongodb://127.0.0.1:27017/jobportal'; // Use your MongoDB URI here
//mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const uri= 'mongodb+srv://mahammadatheek17:64CD3iWJIUMED24C@cluster0.rdkhg.mongodb.net/jobportal'
mongoose.connect(uri)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Import routers
const notificationsRouter = require('./routes/notifications');
const jobsRouter = require('./routes/jobs');




//Defing Home.js Route
// Route to fetch all jobs and display the newest ones first
app.get('/api/home', async (req, res) => {
    try {
      // Find all jobs and sort by `createdAt` field in descending order
      const jobs = await Job.find().sort({ createdAt: -1 });
      res.json(jobs); // Return the jobs in JSON format
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  });
  



// Routes
app.use(jobRoutes);

// Define the /api/job/:id route to fetch job details by ID
// app.get('/api/home/:id', async (req, res) => {
//     try {
//         const job = await Job.findById(req.params.id);
//         if (!job) {
//             return res.status(404).send({ message: 'Job not found' });
//         }
//         res.send(job);
//     } catch (error) {
//         res.status(500).send({ message: 'Error fetching job details' });
//     }
// });




// Route to get job details by ID

// Get job details by ID
// router.get('/api/jobs/:id', async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId);

//         if (!job) {
//             return res.status(404).json({ message: 'Job not found' });
//         }

//         res.status(200).json(job);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching job details', error });
//     }
// });




// Define the Off Campus route to fetch data from MongoDB
app.get('/api/offcampus', async (req, res) => {
    try {
        const offCampusJobs = await Job.find({jobType: 'OffCampus'}).sort({ createdAt: -1 }); // Fetch all job data from MongoDB
        res.json(offCampusJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
});



app.get('/api/internships', async (req, res) => {
    try {
        const internshipJobs = await Job.find({ jobType: 'Internship' }).sort({ createdAt: -1 });
        res.json(internshipJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Internship jobs', error });
    }
});

app.get('/api/freshers', async (req, res) => {
    try {
        const fresherJobs = await Job.find({ jobType: 'Fresher' }).sort({ createdAt: -1 });
        res.json(fresherJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Fresher jobs', error });
    }
});

app.get('/api/experience', async (req, res) => {
    try {
        const experienceJobs = await Job.find({ jobType: 'Experience' }).sort({ createdAt: -1 });
        res.json(experienceJobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Experience jobs', error });
    }
});


// API to get distinct cities
app.get('/api/cities', async (req, res) => {
    try {
        const cities = await Job.find().distinct('location'); // Fetch unique city names
        res.json(cities); // Send cities as a response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Route to get jobs by city
app.get('/api/job-by-city/:city', async (req, res) => {
    try {
      const city = req.params.city;
      const jobs = await Job.find({ location: city }).sort({ createdAt: -1 });
      res.json(jobs);
    } catch (err) {
      console.error('Error fetching jobs by city:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// app.get('/api/support', async (req, res) => {
//     try {
//         const supportJobs = await Job.find({ jobType: 'Support' });
//         res.json(supportJobs);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching Support jobs', error });
//     }
// });


//Job routes
app.use('/api/jobs', jobRoutes);
// Feedback routes
app.use('/api/feedback', feedbackRoutes);
// Use the routers
app.use('/api/notifications', notificationsRouter);
app.use('/api/jobs', jobsRouter);


// Use the job routes


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



*/
























/*


// Email Verification API Key
const emailVerificationAPIKey = 'https://emailvalidation.abstractapi.com/v1/?api_key=8859f5780c9c4e29b09aa624fde99e64&email=smahammadatheek@gmail.com';

// Function to verify email using external API

const verifyEmail = async (email) => {
    try {
      const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${emailVerificationAPIKey}&email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error verifying email:', error.message);
      return null;
    }
  };
  
  app.post('/api/feedback', async (req, res) => {
    const { name, email, message } = req.body;
  
    console.log('Received feedback:', req.body); // Log received data
  
    if (!name || !email || !message) {
      console.log('Validation failed: All fields are required.');
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
  
    const emailData = await verifyEmail(email);
  
    if (!emailData) {
      console.log('Email verification failed.');
      return res.status(400).json({ success: false, message: 'Error verifying email.' });
    }
  
    console.log('Email verification result:', emailData); // Log verification result
  
    if (emailData.deliverability === 'DELIVERABLE') {
      try {
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        res.json({ success: true, message: 'Feedback submitted successfully!' });
      } catch (error) {
        console.error('Error saving feedback:', error.message);
        res.status(500).json({ success: false, message: 'Error saving feedback.' });
      }
    } else {
      console.log('Invalid or undeliverable email address.');
      res.status(400).json({ success: false, message: 'Invalid or undeliverable email address.' });
    }
  });
*/




/*

//const feedbackRouter = require('./routes/feedback');
//app.use('/api/feedback', feedbackRouter);

app.post('/api/feedback', async (req, res) => {
    const { name, email, feedback } = req.body;

    // Save feedback to database
    const newFeedback = new Feedback({ name, email, feedback });
    try {
        await newFeedback.save();

        // Send email notification to the website owner
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL, // Website owner's email
            subject: 'New Feedback Submission on Job Portal',
            text: `Dear Owner,

You have received a new feedback submission from the Job Portal.

Here are the details:

Name: ${name}
Email: ${email}
Feedback: ${feedback}

Please review this feedback and take any necessary actions.

Best Regards,
Job Portal Feedback System`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: 'Error sending email notification' });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Feedback submitted and email notification sent' });
        });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
});

*/
