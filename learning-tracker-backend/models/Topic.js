const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String },
  status: { type: String, enum: ['to learn', 'in progress', 'completed'], default: 'to learn' },
  notes: { type: String },
  dateAdded: { type: Date, default: Date.now },
  dateCompleted: { type: Date }
});

module.exports = mongoose.model('Topic', TopicSchema);
