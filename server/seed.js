require('dotenv').config();
const fs = require('fs');
const path = require('path');
const initDb = require('./initDb');
const Job = require('./models/Job');
const Application = require('./models/Application');
const Message = require('./models/Message');
const pool = require('./db');

const DB_FILE = path.join(__dirname, 'db.json');

async function seed() {
  try {
    // 1. Init Tables
    await initDb();
    console.log('✅ Connected to MySQL for general seeding...');

    // 2. Read db.json
    if (!fs.existsSync(DB_FILE)) {
      console.error(`❌ db.json not found at ${DB_FILE}`);
      process.exit(1);
    }
    const rawData = fs.readFileSync(DB_FILE, 'utf8');
    const data = JSON.parse(rawData);

    // 3. Clear existing data (Optional, but matches previous behaviour)
    await pool.execute('SET FOREIGN_KEY_CHECKS = 0');
    await pool.execute('TRUNCATE TABLE jobs');
    await pool.execute('TRUNCATE TABLE applications');
    await pool.execute('TRUNCATE TABLE messages');
    await pool.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('🗑️  Cleared existing tables.');

    // 4. Seed Jobs
    if (data.jobs && data.jobs.length > 0) {
      for (const job of data.jobs) {
        await Job.create(job);
      }
      console.log(`📦 Inserted ${data.jobs.length} jobs.`);
    }

    // 5. Seed Applications
    if (data.applications && data.applications.length > 0) {
      for (const app of data.applications) {
        await Application.create({
          ...app,
          jobId: String(app.jobId)
        });
      }
      console.log(`📩 Inserted ${data.applications.length} applications.`);
    }

    // 6. Seed Messages
    if (data.messages && data.messages.length > 0) {
      for (const msg of data.messages) {
        await Message.create(msg);
      }
      console.log(`💬 Inserted ${data.messages.length} messages.`);
    }

    console.log('\n🎉 MySQL Database seeded successfully from db.json!');
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    process.exit(0);
  }
}

seed();
