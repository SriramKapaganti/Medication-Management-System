const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const JWT_SECRET = 'your_secret_key';
const cookieParser = require('cookie-parser');

// SIGNUP
router.post('/signup', (req, res) => {
  const { username, password, role, caretaker_id } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (role === 'caretaker') {
    const checkCaretakerQuery = `SELECT * FROM caretaker WHERE username = ?`;
    db.get(checkCaretakerQuery, [username], (err, existingUser) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (existingUser) return res.status(409).json({ error: 'Username already exists' });

      const insertCaretakerQuery = `INSERT INTO caretaker (username, password, role) VALUES (?, ?, ?)`;
      db.run(insertCaretakerQuery, [username, password, role], function (err) {
        if (err) return res.status(500).json({ error: 'Failed to register caretaker' });

        const user = { id: this.lastID, username, role };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 86400000
        });

        res.status(201).json({ message: 'Signup successful', user });
      });
    });
  } else if (role === 'patient') {
    const checkPatientQuery = `SELECT * FROM users WHERE username = ?`;
    db.get(checkPatientQuery, [username], (err, existingUser) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (existingUser) return res.status(409).json({ error: 'Username already exists' });

      const insertPatientQuery = `INSERT INTO users (username, password, role, caretaker_id) VALUES (?, ?, ?, ?)`;
      db.run(insertPatientQuery, [username, password, role, caretaker_id], function (err) {
        if (err) return res.status(500).json({ error: 'Failed to register patient' });

        const user = { id: this.lastID, username, role };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 86400000
        });

        res.status(201).json({ message: 'Signup successful', user });
      });
    });
  } else {
    return res.status(400).json({ error: 'Invalid role' });
  }
});


// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const userQuery = `
    SELECT id, username, 'patient' as role FROM users WHERE username = ? AND password = ?
    UNION
    SELECT id, username, 'caretaker' as role FROM caretaker WHERE username = ? AND password = ?
  `;

  db.get(userQuery, [username, password, username, password], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 86400000
    });
    res.json({ message: 'Login successful', user });
  });
});

// CHECK USER INFO
router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });
    res.json({ user });
  });
});

// GET all caretakers
router.get('/caretaker', (req, res) => {
  const query = `SELECT id, username FROM caretaker`;
  db.all(query, [], (err, caretakers) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json({ caretakers });
  });
});

//Get PatientList

router.get('/patientList/:user_id', (req, res)=>{
  const {user_id} = req.params
  const query = `SELECT * FROM users WHERE caretaker_id = ?`
  db.all(query, [user_id], (err, patientList) => {
    if(err) return res.status(404).json({error: "No Patient Assigned"})
    res.status(200).json({patientList})  
  })
})

//logout

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
  });
  res.json({ message: 'Logged out successfully' });
});



module.exports = router;


