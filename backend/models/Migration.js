const mongoose = require('mongoose');

const migrationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  executedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Migration', migrationSchema);
