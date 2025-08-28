const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM results', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM results WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  const { event_id, user_id, position } = req.body;
  if (!event_id || !user_id || !position) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  db.query('INSERT INTO results SET ?', { event_id, user_id, position }, (err, result) => {
    if (err) {
      console.error('Result insert error:', err);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
    res.status(201).json({ success: true, message: 'Result added successfully.' });
  });
};

exports.update = (req, res) => {
  db.query('UPDATE results SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.remove = (req, res) => {
  db.query('DELETE FROM results WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Deleted successfully' });
  });
};
