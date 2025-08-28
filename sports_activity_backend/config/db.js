const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',               // ✅ Your MySQL username
  password: 'GRUCH$29#05&&',  // ✅ Your MySQL password here
  database: 'sports_activity_db'
});

db.connect((err) => {
  if (err) {
    console.error('DB Connection Error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
