const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: String, default: '' },
  coverLetter: { type: String, default: '' },
  resume: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
