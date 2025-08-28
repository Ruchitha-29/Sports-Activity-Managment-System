const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM coaches', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM coaches WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  db.query('INSERT INTO coaches SET ?', req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  db.query('UPDATE coaches SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.remove = (req, res) => {
  db.query('DELETE FROM coaches WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Deleted successfully' });
  });
};
