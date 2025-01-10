import React, { useState } from 'react';
import QuizApp from './components/QuizApp';
import Home from './pages/Home';

const App = () => {
  const [quizCriteria, setQuizCriteria] = useState(null);

  const startQuiz = (criteria) => {
    setQuizCriteria(criteria); // Update quiz criteria

  };

  return (
    <div>
      {!quizCriteria ? (
        <Home startQuiz={startQuiz} />
      ) : (
        <QuizApp
          selectedCategory={quizCriteria.selectedCategory}
          questionCount={quizCriteria.questionCount}
          difficulty={quizCriteria.difficulty}
        />
      )}
    </div>
  );
};

export default App;