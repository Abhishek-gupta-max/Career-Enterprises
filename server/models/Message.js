const pool = require('../db');

const Message = {
  async create({ name, email, phone = '', subject = '', message }) {
    const [result] = await pool.execute(
      `INSERT INTO messages (name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, subject, message]
    );
    return { id: result.insertId, name, email, phone, subject, message };
  },

  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM messages ORDER BY submittedAt DESC');
    return rows;
  }
};

module.exports = Message;
