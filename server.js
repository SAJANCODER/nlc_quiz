const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/quizdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Models
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');
const User = require('./models/User');

// Admin sets quiz timing
app.post('/admin/set-quiz', async (req, res) => {
  const { startTime, endTime } = req.body;
  const quiz = new Quiz({ startTime, endTime, isActive: false });
  await quiz.save();
  res.send('Quiz timing set successfully');
});

// Admin activates quiz
app.post('/admin/activate-quiz', async (req, res) => {
  const quiz = await Quiz.findOne();
  quiz.isActive = true;
  await quiz.save();
  res.send('Quiz activated');
});

// User gets quiz questions
app.get('/user/quiz', async (req, res) => {
  const quiz = await Quiz.find();
  console.log(quiz)
  if (!quiz) return res.json({ questions: [] }); 
  const currentTime = new Date();
  if (currentTime >= quiz.startTime && currentTime <= quiz.endTime && quiz.isActive) {
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]); // Random 10 questions
    res.json({ questions });
  } else {
    res.status(403).send('Quiz is not active');
  }
});

// User submits quiz
app.post('/user/submit-quiz', async (req, res) => {
  const { username, responses } = req.body;
  const user = await User.findOne({ username });
  user.quizResponses = responses;
  await user.save();
  res.send('Quiz submitted successfully');
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));