const express = require('express');
const { addEntry, getEntries } = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addEntry);       // Create today's entry
router.get('/', protect, getEntries);      // Get all entries for user

module.exports = router;
