const pool = require('../db');

const Application = {
  async create({ jobId, fullName, email, phone, experience = '', coverLetter = '', resume = '' }) {
    const [result] = await pool.execute(
      `INSERT INTO applications (jobId, fullName, email, phone, experience, coverLetter, resume)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [jobId, fullName, email, phone, experience, coverLetter, resume]
    );
    return { id: result.insertId, jobId, fullName, email, phone, experience, coverLetter, resume };
  },

  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM applications ORDER BY submittedAt DESC');
    return rows;
  }
};

module.exports = Application;
