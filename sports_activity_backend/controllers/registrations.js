const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM registrations', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getRegistrationsWithDetails = (req, res) => {
  const query = `
    SELECT 
      r.id,
      r.registration_date,
      u.username as student_name,
      e.title as event_title,
      e.date as event_date,
      e.location as event_location
    FROM registrations r
    JOIN users u ON r.user_id = u.id
    JOIN events e ON r.event_id = e.id
    ORDER BY r.registration_date DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching registrations:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM registrations WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  db.query('INSERT INTO registrations SET ?', req.body, (err, result) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: 'Failed to create registration' });
    }
    res.json({ success: true, id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  db.query('UPDATE registrations SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.remove = (req, res) => {
  db.query('DELETE FROM registrations WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Deleted successfully' });
  });
};
