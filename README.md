# TriviaQuest - ICT Trivia Quiz Website

## Project Overview
TriviaQuest is a web-based trivia quiz application designed to test and improve knowledge of ICT and computer fundamentals. The project is built using a full-stack approach with HTML, CSS, JavaScript, PHP, and MySQL. It allows users to create accounts, log in, and challenge themselves with various quiz categories.

This project was developed as an individual academic assignment for the COM 2303 course to demonstrate proficiency in web development and database management.

---

## Features

- User Authentication:Secure signup and login functionality powered by PHP and MySQL.
- Interactive Quiz System:Features over 60 ICT-related questions.
- Multiple Difficulty Levels:Users can choose between Easy, Medium, and Hard modes.
- Leaderboard System:Displays top scores to encourage healthy competition.
- User Dashboard:A personalized area for users to track their progress and past scores.
- Theme Toggle:Supports both Dark Mode and Light Mode for a better user experience.
- Responsive Design: Fully responsive UI built with Bootstrap 5 to work on all devices.

---

## Technologies Used

- **Frontend:** HTML5, CSS, JavaScript, Bootstrap 
- **Backend:** PHP 
- **Database:** MySQL 
- **Security:** Implements Bcrypt password hashing and Prepared Statements to prevent SQL Injection

---

## Project Structure

```text
trivia/
│
├── index.php           # Landing Page
├── login.php           # User Login
├── signup.php          # User Registration
├── quiz.php            # Main Quiz Interface
├── leaderboard.php     # High Scores Page
├── dashboard.php       # User Profile & Stats
│
├── css/
│   └── style.css       # Custom Styles
│
├── js/
│   ├── app.js          # Core Logic
│   ├── theme.js        # Dark/Light Mode Switch
│   └── quiz-logic.js   # Quiz Functionality
│
├── includes/
│   └── db_connect.php  # Database Connection File
│
└── database/
    └── database.sql    # SQL Export File

    ---

## How the Quiz Works

- Users must first register or log in to access the quiz.
- After selecting a difficulty level (Easy, Medium, or Hard), the quiz questions are loaded.
- The system includes over 60 ICT-related questions across these three levels.
- Once the quiz is completed, scores are automatically calculated and securely stored in the MySQL database.
- Users can then view their progress and rankings via the Dashboard and Leaderboard.

---

## Security Measures

- **Password Protection:** User passwords are encrypted using **bcrypt hashing** before being stored in the database.
- **Database Safety:** The application uses **Prepared Statements** (PDO) to protect against SQL Injection attacks.
- **Session Management:** PHP sessions are used to ensure that only authenticated users can access the quiz and dashboard.

---

## License

This project is developed strictly for educational purposes as part of an academic curriculum.