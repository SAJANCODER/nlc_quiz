import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/quiz');
        setQuestions(response.data.questions);
      } catch (err) {
        setError(err.response?.data?.error || 'Quiz not Fetched');
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/user/submit-quiz', {
        username: 'user1', // Replace with actual username
        responses: answers
      });
      alert('Quiz submitted successfully!');
    } catch (err) {
      setError('Failed to submit quiz');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="quiz-container">
      {questions.map((q, idx) => (
        <div key={idx} className="question">
          <h3>{q.question}</h3>
          <div className="options">
            {q.options.map((opt, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`question-${idx}`}
                  value={opt}
                  onChange={() => handleAnswerChange(idx, opt)}
                />
                {opt}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};


export default Quiz;