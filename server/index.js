require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Job = require('./models/Job');
const Application = require('./models/Application');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Career_Enterprises')
  .then(() => console.log('✅ Connected to MongoDB — Career_Enterprises'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// --- Endpoints ---

// Get all jobs with filters
app.get('/api/jobs', async (req, res) => {
  try {
    const { search, category, country, type, sort, page = 1, limit = 9, groupBy } = req.query;
    let filter = {};

    // Search
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { title: regex },
        { company: regex },
        { location: regex },
        { country: regex },
        { category: regex }
      ];
    }

    // Filters
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (country && country !== 'All Countries') {
      filter.country = country;
    }
    if (type && type !== 'All Types') {
      filter.type = type;
    }

    // Sort
    let sortOption = {};
    if (sort === 'newest') {
      sortOption = { postedAt: -1 };
    } else if (sort === 'oldest') {
      sortOption = { postedAt: 1 };
    }

    // Handle grouping
    if (groupBy === 'category') {
      const results = await Job.find(filter).sort(sortOption).lean();
      const grouped = {};
      results.forEach((job) => {
        if (!grouped[job.category]) {
          grouped[job.category] = [];
        }
        grouped[job.category].push(job);
      });
      return res.json({
        jobs: grouped,
        total: results.length,
        isGrouped: true
      });
    }

    const total = await Job.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const jobs = await Job.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.json({
      jobs,
      total,
      totalPages,
      page: parseInt(page)
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured jobs
app.get('/api/jobs/featured', async (req, res) => {
  try {
    const featured = await Job.find({ featured: true }).limit(4).lean();
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single job
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findOne({ id: parseInt(req.params.id) }).lean();
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit application
app.post('/api/applications', async (req, res) => {
  try {
    const newApp = new Application({
      ...req.body,
      submittedAt: new Date()
    });
    await newApp.save();
    res.status(201).json({ success: true, message: 'Application received!' });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ message: 'Failed to submit application' });
  }
});

// Get all applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 }).lean();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit contact message
app.post('/api/contact', async (req, res) => {
  try {
    const newMsg = new Message({
      ...req.body,
      submittedAt: new Date()
    });
    await newMsg.save();
    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (err) {
    console.error('Error submitting message:', err);
    res.status(500).json({ message: 'Failed to submit message' });
  }
});

// --- Admin Job Management Endpoints ---

// Create a new job
app.post('/api/jobs', async (req, res) => {
  try {
    // Get the next id
    const lastJob = await Job.findOne().sort({ id: -1 }).lean();
    const nextId = lastJob ? lastJob.id + 1 : 1;

    const newJob = new Job({
      id: nextId,
      ...req.body,
      postedAt: new Date().toISOString().split('T')[0],
      status: req.body.status || 'Published'
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Failed to create job' });
  }
});

// Update an existing job
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    ).lean();
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ message: 'Failed to update job' });
  }
});

// Patch job status (Publish/Unpublish)
app.patch('/api/jobs/:id/status', async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { status: req.body.status },
      { new: true }
    ).lean();
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    console.error('Error updating job status:', err);
    res.status(500).json({ message: 'Failed to update job status' });
  }
});

// Delete a job
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const result = await Job.findOneAndDelete({ id: parseInt(req.params.id) });
    if (result) {
      res.json({ success: true, message: 'Job deleted successfully' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: 'Failed to delete job' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
