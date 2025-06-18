const JournalEntry = require('../models/JournalEntry');

exports.addEntry = async (req, res) => {
  const userId = req.user.id;
  const { entry } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const existing = await JournalEntry.findOne({ user: userId, date: today });
    if (existing) {
      return res.status(400).json({ message: 'Entry for today already exists' });
    }

    const newEntry = await JournalEntry.create({ user: userId, entry, date: today });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getEntries = async (req, res) => {
  const userId = req.user.id;

  try {
    const entries = await JournalEntry.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
