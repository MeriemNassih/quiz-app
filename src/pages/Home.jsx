import React, { useState, useEffect } from 'react';
import '../styles/Home.css'; // Import styles
import image1 from '../assets/image1.jpg'; // Import images
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const Home = ({ startQuiz }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [isFormVisible, setIsFormVisible] = useState(false); // State to show/hide the form

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        if (!response.ok) {
          throw new Error('Error loading categories');
        }
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    startQuiz({ selectedCategory, questionCount, difficulty });
  };

  return (
    <div className="home-container">
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="logo">QuizApp</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
        </ul>
      </nav>

      {/* Header */}
      <header className="header">
        <h1 className="header-title" style={{ marginBottom: '1.5rem' }}>Welcome to the Quiz</h1>
        <button 
          onClick={() => setIsFormVisible(true)} 
          className="form-button" 
        >
          Show Form
        </button>
      </header>

      {/* About Us Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Welcome to our quiz application! Test your knowledge in various fields
          by answering fun and challenging questions. Choose a category, the number
          of questions, and the difficulty, then dive into the quiz. Have fun and learn
          at the same time!
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature">
          <img src={image1} alt="Feature 1" className="feature-image" />
          <p className="feature-description">
            Explore a variety of categories to test your knowledge.
          </p>
        </div>
        <div className="feature">
          <img src={image2} alt="Feature 2" className="feature-image" />
          <p className="feature-description">
            Choose the number of questions and the difficulty that suits you.
          </p>
        </div>
        <div className="feature">
          <img src={image3} alt="Feature 3" className="feature-image" />
          <p className="feature-description">
            Get instant results and improve your skills.
          </p>
        </div>
      </section>

      {/* Modal Form */}
      {isFormVisible && (
        <div className="modal-overlay">
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">-- Select a category --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="questions">Number of questions:</label>
                <input
                  type="number"
                  id="questions"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                  min="1"
                  max="50"
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty:</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <button type="submit" className="form-button">Start Quiz</button>
              <button
                type="button"
                className="form-button cancel-button"
                onClick={() => setIsFormVisible(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 QuizApp. All rights reserved.</p>
        <p>Developed with ❤️ by Meriem.</p>
      </footer>
    </div>
  );
};

export default Home;