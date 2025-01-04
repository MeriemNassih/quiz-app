Quiz App
Quiz App is an interactive application that allows users to test their knowledge on various topics by answering multiple-choice questions. The app connects to the Open Trivia Database API to fetch quiz questions, displaying them one by one and calculating the final score at the end of the quiz.

Table of Contents
Description
Technologies Used
Installation
Usage
Project Structure
Features
Troubleshooting
Authors
Description
This app allows users to select a category, difficulty level, and number of questions before starting a quiz. Users can answer questions, and at the end, their score will be displayed along with the option to review their answers and retake the quiz.

Key Features:

Category and difficulty selection.
Displaying questions with multiple-choice answers.
Tracking the user's score during the quiz.
Displaying the final score and correct/incorrect answers at the end.
Responsive design for use on all devices.
Technologies Used
Frontend: React, HTML, CSS, TailwindCSS (optional)
API: Open Trivia Database API (https://opentdb.com/)
Request Handling: Axios
Development Tools: Vite (or Create React App), GitHub for version control
Installation
Clone this repository:
bash
Copier le code
git clone https://github.com/MeriemNassih/quiz-app
cd quiz-app
Install dependencies:
npm install

Start the local server:
npm start

Usage
Once the app is launched, the user can:

Select a category from a list of available topics (e.g., General Knowledge, Science, History, etc.).
Choose the difficulty level (Easy, Medium, Hard).
Select the number of questions to be displayed in the quiz.
The user starts answering questions one by one. After selecting an answer, they move to the next question.

At the end of the quiz, the final score is displayed along with a summary of correct and incorrect answers.

The user can retake the quiz or choose a different topic.

Project Structure

src/
├── components/
│   ├── QuizStart.jsx         # Component to start the quiz
│   ├── QuestionCard.jsx      # Component to display questions
│   ├── ScoreSummary.jsx      # Component to display final score
├── pages/
│   ├── Home.jsx              # Home page
│   ├── Quiz.jsx              # Quiz page
│   ├── Results.jsx           # Results page
├── utils/
│   └── api.js                # Handles API calls to Open Trivia Database
├── App.jsx                   # Main component
├── index.css                 # Global styles
├── main.jsx                  # Entry point
Features
Fetching Questions: The app uses the Open Trivia Database API to fetch questions based on the user-selected category and difficulty level.
Displaying Questions: Questions are displayed one by one with multiple-choice answers.
Score Tracking: The score is updated in real time and displayed at the end of the quiz.
Quiz History: Optionally, the app can store the user's score history in local storage to track progress.
Responsive Design: The app is fully responsive using TailwindCSS for an optimal user experience on all devices.
Troubleshooting
API Connection Issues: If you encounter an API-related error, check your internet connection. The Open Trivia Database API is public, but there might be rate limits if it’s overused.

Layout Issues: If the UI doesn’t display correctly, ensure that TailwindCSS is properly configured and the CSS classes are applied correctly.

Authors
This project was developed by Meriem Nassih - Your GitHub
