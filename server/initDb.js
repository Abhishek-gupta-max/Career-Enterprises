require('dotenv').config();
const pool = require('./db');

async function initDb() {
  const conn = await pool.getConnection();
  try {
    // Users table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin','user') DEFAULT 'user',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Jobs table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        salary_min INT DEFAULT 0,
        salary_max INT DEFAULT 0,
        salary_currency VARCHAR(20) DEFAULT 'AED',
        salary_period VARCHAR(50) DEFAULT 'month',
        description TEXT,
        requirements JSON,
        benefits JSON,
        experience INT DEFAULT 0,
        lastDate VARCHAR(50),
        postedAt VARCHAR(50) NOT NULL,
        featured TINYINT(1) DEFAULT 0,
        urgent TINYINT(1) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Published',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Applications table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        jobId VARCHAR(100) NOT NULL,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        experience TEXT,
        coverLetter TEXT,
        resume TEXT,
        submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Messages table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ All MySQL tables ready.');
  } finally {
    conn.release();
  }
}

module.exports = initDb;
