const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors()); // Allow CORS for all origins (you can limit this in production)
app.use(bodyParser.json()); // Parse JSON bodies

// ==========================
// DATABASE CONNECTION
// ==========================
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// ==========================
// API ROUTES
// ==========================
app.use('/api/users', require('./routes/users'));
app.use('/api/sports', require('./routes/sports'));
app.use('/api/events', require('./routes/events'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/coaches', require('./routes/coaches'));
app.use('/api/results', require('./routes/results'));

// Registration endpoint
const usersController = require('./controllers/users');
app.post('/api/register', usersController.register);

// ==========================
//ADMIN LOGIN ROUTE
//==========================
// ==========================
// ADMIN LOGIN ROUTE (SQL-based)
// ==========================
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query to match user by username
  const query = `SELECT * FROM users WHERE username = ?`;

  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length > 0) {
      const user = results[0];
      // Compare hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).json({
          success: true,
          message: 'Login successful',
          user: {
            id: user.id,
            username: user.username,
            role: user.role
          }
        });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;

//   // ✅ TEMP: Hardcoded credentials
//   if (username === "admin" && password === "1234") {
//     res.status(200).json({ message: "Login successful" });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// });


// ==========================
// SERVE FRONTEND STATIC FILES
// ==========================
const frontendPath = path.join(__dirname, '../sports_activity_frontend');
app.use(express.static(frontendPath));

// Fallback route (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ==========================
// START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
