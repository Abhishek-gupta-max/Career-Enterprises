require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initDb = require('./initDb');

const Job = require('./models/Job');
const Application = require('./models/Application');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect and initialise tables
initDb()
  .then(() => console.log('✅ Connected to MySQL — career_enterprises'))
  .catch((err) => {
    console.error('❌ MySQL init error:', err.message);
    process.exit(1);
  });

const authRoutes = require('./routes/auth');
const { auth, adminOnly } = require('./middleware/auth');

app.use('/api/auth', authRoutes);

// ─── GET all jobs (search, filter, sort, paginate, group) ───────────────────
app.get('/api/jobs', async (req, res) => {
  try {
    const { search, category, country, type, sort, page = 1, limit = 9, groupBy } = req.query;

    const filter = {};
    if (search) filter.search = search;
    if (category && category !== 'All') filter.category = category;
    if (country && country !== 'All Countries') filter.country = country;
    if (type && type !== 'All Types') filter.type = type;

    let sortOption = {};
    if (sort === 'newest') sortOption = { field: 'postedAt', dir: 'DESC' };
    else if (sort === 'oldest') sortOption = { field: 'postedAt', dir: 'ASC' };

    if (groupBy === 'category') {
      const results = await Job.findAll(filter, sortOption, 0, 9999);
      const grouped = {};
      results.forEach((job) => {
        if (!grouped[job.category]) grouped[job.category] = [];
        grouped[job.category].push(job);
      });
      return res.json({ jobs: grouped, total: results.length, isGrouped: true });
    }

    const total = await Job.count(filter);
    const totalPages = Math.ceil(total / parseInt(limit));
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const jobs = await Job.findAll(filter, sortOption, skip, parseInt(limit));

    res.json({ jobs, total, totalPages, page: parseInt(page) });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── GET featured jobs ───────────────────────────────────────────────────────
app.get('/api/jobs/featured', async (req, res) => {
  try {
    const featured = await Job.findFeatured(4);
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── GET single job ──────────────────────────────────────────────────────────
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── POST submit application ─────────────────────────────────────────────────
app.post('/api/applications', async (req, res) => {
  try {
    await Application.create(req.body);
    res.status(201).json({ success: true, message: 'Application received!' });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ message: 'Failed to submit application' });
  }
});

// ─── GET all applications (Admin) ───────────────────────────────────────────
app.get('/api/applications', [auth, adminOnly], async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── DELETE application (Admin) ──────────────────────────────────────────────
app.delete('/api/applications/:id', [auth, adminOnly], async (req, res) => {
  try {
    const deleted = await Application.delete(req.params.id);
    if (deleted) {
      res.json({ success: true, message: 'Application deleted successfully' });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (err) {
    console.error('Error deleting application:', err);
    res.status(500).json({ message: 'Failed to delete application' });
  }
});

// ─── POST submit contact message ─────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    await Message.create(req.body);
    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (err) {
    console.error('Error submitting message:', err);
    res.status(500).json({ message: 'Failed to submit message' });
  }
});

// ─── ADMIN: Create job ───────────────────────────────────────────────────────
app.post('/api/jobs', [auth, adminOnly], async (req, res) => {
  try {
    const newJob = await Job.create({
      ...req.body,
      postedAt: new Date().toISOString().split('T')[0],
      status: req.body.status || 'Published'
    });
    res.status(201).json(newJob);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Failed to create job' });
  }
});

// ─── ADMIN: Update job ───────────────────────────────────────────────────────
app.put('/api/jobs/:id', [auth, adminOnly], async (req, res) => {
  try {
    const job = await Job.update(req.params.id, req.body);
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

// ─── ADMIN: Patch job status ─────────────────────────────────────────────────
app.patch('/api/jobs/:id/status', [auth, adminOnly], async (req, res) => {
  try {
    const job = await Job.updateStatus(req.params.id, req.body.status);
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

// ─── ADMIN: Delete job ───────────────────────────────────────────────────────
app.delete('/api/jobs/:id', [auth, adminOnly], async (req, res) => {
  try {
    const deleted = await Job.delete(req.params.id);
    if (deleted) {
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
