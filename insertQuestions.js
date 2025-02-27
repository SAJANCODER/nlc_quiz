const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quizdb', { useNewUrlParser: true, useUnifiedTopology: true });

const Question = require('./models/Question');

const questions = [
  {
    topic: "Environment",
    question: "What is the primary source of energy in a thermal power plant?",
    options: ["Coal", "Solar", "Wind", "Hydro"],
    correctAnswer: "Coal"
  },
  {
    topic: "Operation",
    question: "What is the function of a boiler in a thermal power plant?",
    options: ["Generate steam", "Produce electricity", "Cool the system", "Filter air"],
    correctAnswer: "Generate steam"
  },
  {
    topic: "Maintenance",
    question: "What is the purpose of regular maintenance in a thermal power plant?",
    options: ["Increase efficiency", "Reduce downtime", "Prevent accidents", "All of the above"],
    correctAnswer: "All of the above"
  }
];

const insertQuestions = async () => {
  await Question.insertMany(questions);
  console.log('Questions inserted successfully');
  mongoose.connection.close();
};

insertQuestions();