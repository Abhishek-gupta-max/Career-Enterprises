const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// --- Endpoints ---

// Get all jobs with filters
app.get('/api/jobs', (req, res) => {
  const { search, category, country, type, sort, page = 1, limit = 9, groupBy } = req.query;
  const db = readDB();
  let results = [...db.jobs];

  // Search
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.country.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q)
    );
  }

  // Filters
  if (category && category !== 'All') {
    results = results.filter((j) => j.category === category);
  }
  if (country && country !== 'All Countries') {
    results = results.filter((j) => j.country === country);
  }
  if (type && type !== 'All Types') {
    results = results.filter((j) => j.type === type);
  }

  // Sort (simplified for now)
  if (sort === 'newest') {
    results.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }

  // Handle grouping
  if (groupBy === 'category') {
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

  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  res.json({
    jobs: paginated,
    total,
    totalPages,
    page: parseInt(page)
  });
});

// Get featured jobs
app.get('/api/jobs/featured', (req, res) => {
  const db = readDB();
  const featured = db.jobs.filter(j => j.featured).slice(0, 4);
  res.json(featured);
});

// Get single job
app.get('/api/jobs/:id', (req, res) => {
  const db = readDB();
  const job = db.jobs.find(j => j.id === parseInt(req.params.id));
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Submit application
app.post('/api/applications', (req, res) => {
  const db = readDB();
  const newApplication = {
    id: Date.now(),
    ...req.body,
    submittedAt: new Date().toISOString()
  };
  db.applications.push(newApplication);
  writeDB(db);
  res.status(201).json({ success: true, message: 'Application received!' });
});

// Get all applications
app.get('/api/applications', (req, res) => {
  const db = readDB();
  const applications = [...db.applications].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  res.json(applications);
});

// Submit contact message
app.post('/api/contact', (req, res) => {
  const db = readDB();
  const newMessage = {
    id: Date.now(),
    ...req.body,
    submittedAt: new Date().toISOString()
  };
  db.messages.push(newMessage);
  writeDB(db);
  res.status(201).json({ success: true, message: 'Message received!' });
});

// --- Admin Job Management Endpoints ---

// Create a new job
app.post('/api/jobs', (req, res) => {
  const db = readDB();
  const newJob = {
    id: db.jobs.length > 0 ? Math.max(...db.jobs.map(j => j.id)) + 1 : 1,
    ...req.body,
    postedAt: new Date().toISOString().split('T')[0],
    status: req.body.status || 'Published'
  };
  db.jobs.push(newJob);
  writeDB(db);
  res.status(201).json(newJob);
});

// Update an existing job
app.put('/api/jobs/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.jobs.findIndex(j => j.id === id);
  
  if (index !== -1) {
    db.jobs[index] = { ...db.jobs[index], ...req.body };
    writeDB(db);
    res.json(db.jobs[index]);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Patch job status (Publish/Unpublish)
app.patch('/api/jobs/:id/status', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.jobs.findIndex(j => j.id === id);
  
  if (index !== -1) {
    db.jobs[index].status = req.body.status;
    writeDB(db);
    res.json(db.jobs[index]);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Delete a job
app.delete('/api/jobs/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.jobs.findIndex(j => j.id === id);
  
  if (index !== -1) {
    db.jobs.splice(index, 1);
    writeDB(db);
    res.json({ success: true, message: 'Job deleted successfully' });
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
