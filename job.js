const mongoose = require('mongoose');

// Job schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, enum: ['applied', 'interviewing', 'offer', 'rejected'], default: 'applied' },
  applicationDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
