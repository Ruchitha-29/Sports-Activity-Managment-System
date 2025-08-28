CREATE DATABASE IF NOT EXISTS sports_activity_db;
USE sports_activity_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student'
);

CREATE TABLE sports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sport_id INT,
  title VARCHAR(100),
  date DATE,
  location VARCHAR(100),
  FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE SET NULL
);

CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_id INT,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE coaches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  sport_id INT,
  experience_years INT,
  FOREIGN KEY (sport_id) REFERENCES sports(id)
);

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  position VARCHAR(20),
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);