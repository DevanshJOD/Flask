const express = require('express');
const Job = require('../models/job');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Create new job application
router.post('/', protect, async (req, res) => {
  const { title, company, status } = req.body;
  try {
    const job = new Job({ title, company, status, user: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all job applications for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
