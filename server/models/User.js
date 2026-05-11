const pool = require('../db');
const bcrypt = require('bcryptjs');

const User = {
  async findByEmail(email) {
    if (!email) return null;
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.execute('SELECT id, name, email, role, createdAt FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ name, email, password, role = 'user' }) {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email.toLowerCase(), hashed, role]
    );
    return this.findById(result.insertId);
  },

  async updatePassword(id, newPassword) {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(newPassword, salt);
    await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashed, id]);
  },

  async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
};

module.exports = User;
