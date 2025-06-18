const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  entry: {
    type: String,
    required: true,
    maxlength: 300,
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date().setHours(0, 0, 0, 0), 
  },
});

journalEntrySchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
