const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    currency: { type: String, default: 'AED' },
    period: { type: String, default: 'month' }
  },
  description: { type: String, default: '' },
  requirements: [{ type: String }],
  benefits: [{ type: String }],
  experience: { type: Number, default: 0 },
  lastDate: { type: String },
  postedAt: { type: String, required: true },
  featured: { type: Boolean, default: false },
  urgent: { type: Boolean, default: false },
  status: { type: String, default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
