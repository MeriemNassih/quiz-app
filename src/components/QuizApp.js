import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Import the CSS file

const QuizApp = ({ selectedCategory, questionCount, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]); // State to store shuffled answers

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = `${selectedCategory}-${questionCount}-${difficulty}`;
      const cachedQuestions = localStorage.getItem(cacheKey);

      if (cachedQuestions) {
        const parsedQuestions = JSON.parse(cachedQuestions);
        setQuestions(parsedQuestions);
        shuffleAnswers(parsedQuestions); // Shuffle answers after loading questions
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=${questionCount}&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`
        );

        localStorage.setItem(cacheKey, JSON.stringify(response.data.results));
        setQuestions(response.data.results);
        shuffleAnswers(response.data.results); // Shuffle answers after loading questions
      } catch (err) {
        if (err.response && err.response.status === 429) {
          setError('Too many requests, please wait a few moments before trying again.');
        } else {
          setError('Error fetching questions.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedCategory, questionCount, difficulty]);

  // Function to shuffle answers
  const shuffleAnswers = (questions) => {
    const shuffled = questions.map((question) => {
      const answers = [...question.incorrect_answers, question.correct_answer];
      return answers.sort(() => Math.random() - 0.5); // Shuffle answers once
    });
    setShuffledAnswers(shuffled);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      calculateScore();
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;

  if (quizCompleted) {
    return (
      <div className="score-container">
        <h1>Quiz Completed!</h1>
        <h2 className="score-text">Your score: {score} / {questions.length}</h2>
        <button className="restart-button" onClick={() => window.location.reload()}>
          Restart
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex] || '';

  return (
    <div className="quiz-container">
      <div className="question-card">
        <p
          className="question-text"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        ></p>
        <ul className="answers-list">
          {shuffledAnswers[currentQuestionIndex]?.map((answer, i) => (
            <li key={i}>
              <label className="answer-label">
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  checked={currentAnswer === answer}
                  onChange={() => handleAnswerSelect(answer)}
                />
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button className="nav-button" onClick={handleNextQuestion}>
          {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizApp;