require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Job = require('./models/Job');
const Application = require('./models/Application');
const Message = require('./models/Message');

const DB_FILE = path.join(__dirname, 'db.json');

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Career_Enterprises');
    console.log('✅ Connected to MongoDB — Career_Enterprises');

    // Read db.json
    const rawData = fs.readFileSync(DB_FILE, 'utf8');
    const data = JSON.parse(rawData);

    // Clear existing data
    await Job.deleteMany({});
    await Application.deleteMany({});
    await Message.deleteMany({});
    console.log('🗑️  Cleared existing data from all collections.');

    // Seed Jobs
    if (data.jobs && data.jobs.length > 0) {
      await Job.insertMany(data.jobs);
      console.log(`✅ Inserted ${data.jobs.length} jobs.`);
    }

    // Seed Applications
    if (data.applications && data.applications.length > 0) {
      const apps = data.applications.map(app => ({
        jobId: String(app.jobId),
        fullName: app.fullName,
        email: app.email,
        phone: app.phone,
        experience: app.experience || '',
        coverLetter: app.coverLetter || '',
        resume: app.resume || '',
        submittedAt: app.submittedAt ? new Date(app.submittedAt) : new Date()
      }));
      await Application.insertMany(apps);
      console.log(`✅ Inserted ${apps.length} applications.`);
    }

    // Seed Messages
    if (data.messages && data.messages.length > 0) {
      await Message.insertMany(data.messages);
      console.log(`✅ Inserted ${data.messages.length} messages.`);
    }

    console.log('\n🎉 Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
