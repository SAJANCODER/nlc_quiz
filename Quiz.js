const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  isActive: Boolean
});

module.exports = mongoose.model('Quiz', quizSchema);