Sports Activity Management System

A full-stack Sports Activity Management System designed to manage sports activities in an educational institution.
The system provides separate login portals for Admins and Students, ensuring role-based access and controlled management of sports events, registrations, and results.

Built using HTML, CSS, JavaScript for the frontend, Node.js + Express for the backend, and MySQL for the database.

✨ Key Features
🔐 Authentication & Roles

Separate login for Admin and Student

Role-based access control

Backend-validated login credentials

Secure redirection to role-specific dashboards

👩‍💼 Admin Module

Add, update, and delete sports

Create and manage events

Manage coaches details

Update event results

View student registrations

🎓 Student Module

Student login & dashboard

View available sports and events

Register for sports events

View registration status

View results and assigned coaches

📊 Dashboard

Role-based dashboards (Admin / Student)

Centralized management and activity overview

🛠️ Technology Stack
Frontend

HTML5 – Structure

CSS3 – Styling

JavaScript (Vanilla JS) – Client-side logic & API communication

Backend

Node.js

Express.js

RESTful API architecture

Database

MySQL

Database Design (Overview)

users (admin / student roles)

sports

events

registrations

results

coaches

🚀 How to Run the Project
1️⃣ Database Setup (MySQL)

Open MySQL Workbench or MySQL CLI

Create a new database:

CREATE DATABASE sports_activity_db;


Import the provided SQL schema file:

USE sports_activity_db;

SOURCE schema.sql;


Update your database credentials in:

sports_activity_backend/config/db.js

2️⃣ Backend Setup (Node.js + Express)

Navigate to the backend directory:

cd sports_activity_backend


Install required dependencies:

npm install


Start the backend server:

node server.js


The server will run on the configured port
(commonly http://localhost:5000).

The backend handles authentication, role-based access (Admin / Student), and all database operations.

3️⃣ Frontend Setup (HTML, CSS, JavaScript)

Open the sports_activity_frontend folder

Open index.html in any modern web browser

Log in as Admin or Student

Users are redirected to their respective dashboards based on role


