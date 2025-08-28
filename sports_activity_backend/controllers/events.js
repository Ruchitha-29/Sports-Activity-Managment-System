const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM events WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  const { title, sport, date, location, description, coach } = req.body;
  // Map sport name to sport_id
  const sportQuery = 'SELECT id FROM sports WHERE name = ? LIMIT 1';
  db.query(sportQuery, [sport], (err, sportResults) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error (sport lookup).' });
    if (!sportResults.length) {
      return res.status(400).json({ success: false, message: 'Sport not found in database.' });
    }
    const sport_id = sportResults[0].id;
    const eventData = { title, sport_id, date, location, description, coach };
    db.query('INSERT INTO events SET ?', eventData, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Server error (event insert).' });
      res.json({ success: true, id: result.insertId });
    });
  });
};

exports.update = (req, res) => {
  db.query('UPDATE events SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.remove = (req, res) => {
  db.query('DELETE FROM events WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Deleted successfully' });
  });
};
