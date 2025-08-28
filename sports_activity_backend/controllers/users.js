const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  db.query('INSERT INTO users SET ?', req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  db.query('UPDATE users SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.remove = (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Deleted successfully' });
  });
};

// Robust registration handler
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, results) => {
    if (err) {
      console.error('User lookup error:', err);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
    if (results.length > 0) {
      const duplicateField = results[0].username === username ? 'Username' : 'Email';
      return res.status(409).json({ success: false, message: `${duplicateField} already exists.` });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { username, email, password: hashedPassword, role: 'student' };
      db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
          console.error('User insert error:', err);
          return res.status(500).json({ success: false, message: 'Server error.' });
        }
        res.status(201).json({ success: true, message: 'Registration successful.' });
      });
    } catch (err) {
      console.error('Hashing error:', err);
      res.status(500).json({ success: false, message: 'Error hashing password.' });
    }
  });
};
