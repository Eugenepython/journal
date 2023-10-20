const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json()); 
const { Pool } = require('pg');
const secretKey = 'billmaherandtommylee'
console.log(process.env.FRONTEND_URL)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
});

const frontendURL = process.env.FRONTEND_URL;
console.log(frontendURL)

app.use(
  cors({
    origin: [frontendURL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);



app.get('/', (req, res) => {
    const responseData = {
        message: 'This is the response data from the server.',
    };
    res.json(responseData);
});


app.get('/hello', (req, res) => {
  const responseData = {
      message: 'Hello!',
  };
  res.json(responseData);
});

app.post('/signup', (req, res) => {
  console.log(req.body.username)
  const username = req.body.username;
  const password = req.body.password;
  const userExists = {
      message: username + ' already in system'
  };
  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message : err });
    } else {
      if (result.rows.length > 0) {
        res.status(409).json(userExists);
      } else {
        pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], (err, result) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ message: 'Database query error' });
          } else {
            res.status(201).json({ message: username });
          }
        }); 
      }
    }
  });
});


app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const payload = {username : username};
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  const noSuchUser = {
      message: 'No such user exists'
  };
  const wrongPassword = {
      message: 'Wrong password'
  };
  let success = {
      message: 'You are logged in',
      username: username,
      token: token,
      morningMessage: ''
  }
  console.log(username)
  console.log(password)
  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
     res.status(500).json({ message: 'Database query error' });
    } else {
        if (result.rows.length < 1) {
          res.status(409).json(noSuchUser);
        } else if (result.rows.length > 0 && result.rows[0].password !== password) {
          res.status(409).json(wrongPassword);
        } else {
          const user_id = result.rows[0].user_id;
          pool.query('SELECT * FROM morningplan WHERE user_id = $1', [user_id], (err, result) => {
            if (err) {
              console.error('Error executing query:', err);
              res.status(500).json({ message: 'Database query error' });
            } else {
              console.log("?????????????????????????????????")
              console.log(result.rows[0].message);
              let arrayLength = result.rows.length
              success.morningMessage = result.rows[arrayLength-1].message;
              console.log(success)
              res.status(200).json(success);
            }
          });
        }
      }
    });
  });


app.post('/morningplan', (req, res) => {
  console.log(req.body)
  const username = req.body.journalWriter;
  const message = req.body.morningMessage;
  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
     res.status(500).json({ message: 'Database query error' });
    } else if (result.rows.length > 0) {
      const user_id = result.rows[0].user_id;
      pool.query('INSERT INTO morningplan (user_id, date, message) VALUES ($1, $2, $3)', 
      [user_id, new Date(), message], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ message: 'Database query error' });
        } else {
          res.status(201).json({ message: username });
        }
      }); 
    }
  })
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


