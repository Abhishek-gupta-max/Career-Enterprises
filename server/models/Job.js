const pool = require('../db');

const Job = {
  async findAll(filter = {}, sortOption = {}, skip = 0, limit = 9) {
    let sql = 'SELECT * FROM jobs WHERE 1=1';
    const params = [];

    if (filter.search) {
      const s = `%${filter.search}%`;
      sql += ' AND (title LIKE ? OR company LIKE ? OR location LIKE ? OR country LIKE ? OR category LIKE ?)';
      params.push(s, s, s, s, s);
    }
    if (filter.category) {
      sql += ' AND category = ?';
      params.push(filter.category);
    }
    if (filter.country) {
      sql += ' AND country = ?';
      params.push(filter.country);
    }
    if (filter.type) {
      sql += ' AND type = ?';
      params.push(filter.type);
    }

    if (sortOption.field) {
      sql += ` ORDER BY ${sortOption.field} ${sortOption.dir || 'DESC'}`;
    }

    // Use pool.query for LIMIT/OFFSET to avoid prepared statement parameter type issues
    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(skip));

    const [rows] = await pool.query(sql, params);
    return rows.map(parseJob);
  },

  async count(filter = {}) {
    let sql = 'SELECT COUNT(*) as total FROM jobs WHERE 1=1';
    const params = [];

    if (filter.search) {
      const s = `%${filter.search}%`;
      sql += ' AND (title LIKE ? OR company LIKE ? OR location LIKE ? OR country LIKE ? OR category LIKE ?)';
      params.push(s, s, s, s, s);
    }
    if (filter.category) {
      sql += ' AND category = ?';
      params.push(filter.category);
    }
    if (filter.country) {
      sql += ' AND country = ?';
      params.push(filter.country);
    }
    if (filter.type) {
      sql += ' AND type = ?';
      params.push(filter.type);
    }

    const [[{ total }]] = await pool.query(sql, params);
    return total;
  },

  async findFeatured(limit = 4) {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE featured = 1 LIMIT ?', [parseInt(limit)]);
    return rows.map(parseJob);
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [parseInt(id)]);
    return rows.length ? parseJob(rows[0]) : null;
  },

  async create(data) {
    const {
      title, company, location, country, category, type,
      salary = {}, description = '', requirements = [], benefits = [],
      experience = 0, lastDate = '', postedAt, featured = false,
      urgent = false, status = 'Published'
    } = data;

    const [result] = await pool.execute(
      `INSERT INTO jobs (title, company, location, country, category, type,
        salary_min, salary_max, salary_currency, salary_period,
        description, requirements, benefits, experience, lastDate, postedAt,
        featured, urgent, status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        title, company, location, country, category, type,
        salary.min || 0, salary.max || 0, salary.currency || 'AED', salary.period || 'month',
        description,
        JSON.stringify(requirements),
        JSON.stringify(benefits),
        experience, lastDate, postedAt,
        featured ? 1 : 0,
        urgent ? 1 : 0,
        status
      ]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const fields = [];
    const params = [];

    const allowed = [
      'title','company','location','country','category','type',
      'description','experience','lastDate','postedAt','featured','urgent','status'
    ];
    allowed.forEach(key => {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(typeof data[key] === 'boolean' ? (data[key] ? 1 : 0) : data[key]);
      }
    });

    if (data.salary) {
      if (data.salary.min !== undefined) { fields.push('salary_min = ?'); params.push(data.salary.min); }
      if (data.salary.max !== undefined) { fields.push('salary_max = ?'); params.push(data.salary.max); }
      if (data.salary.currency !== undefined) { fields.push('salary_currency = ?'); params.push(data.salary.currency); }
      if (data.salary.period !== undefined) { fields.push('salary_period = ?'); params.push(data.salary.period); }
    }
    if (data.requirements !== undefined) { fields.push('requirements = ?'); params.push(JSON.stringify(data.requirements)); }
    if (data.benefits !== undefined) { fields.push('benefits = ?'); params.push(JSON.stringify(data.benefits)); }

    if (!fields.length) return this.findById(id);
    params.push(parseInt(id));
    await pool.execute(`UPDATE jobs SET ${fields.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  },

  async updateStatus(id, status) {
    await pool.execute('UPDATE jobs SET status = ? WHERE id = ?', [status, parseInt(id)]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM jobs WHERE id = ?', [parseInt(id)]);
    return result.affectedRows > 0;
  }
};

function parseJob(row) {
  return {
    ...row,
    salary: {
      min: row.salary_min,
      max: row.salary_max,
      currency: row.salary_currency,
      period: row.salary_period
    },
    requirements: typeof row.requirements === 'string' ? JSON.parse(row.requirements || '[]') : (row.requirements || []),
    benefits: typeof row.benefits === 'string' ? JSON.parse(row.benefits || '[]') : (row.benefits || []),
    featured: !!row.featured,
    urgent: !!row.urgent
  };
}

module.exports = Job;
