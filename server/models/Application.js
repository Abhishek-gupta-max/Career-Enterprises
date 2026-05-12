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
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM applications WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Application;
