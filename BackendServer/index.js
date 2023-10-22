const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json()); 
const { Pool } = require('pg');
const secretKey = 'billmaherandtommylee'
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const cron = require('node-cron');


//console.log(process.env.FRONTEND_URL)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
});

const frontendURL = process.env.FRONTEND_URL;
//console.log(frontendURL)

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
  let originalPassword = req.body.password;
  let password ='';
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
            bcrypt.genSalt(saltRounds, function(err, salt) {
              if (err) {
                console.error('Error generating salt:', err);
              } else {
                bcrypt.hash(originalPassword, salt, function(err, hash) {
                  if (err) {
                    console.error('Error hashing password:', err);
                  } else {
                    password = hash;
                    pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], (err, result) => {
                      if (err) {
                        console.error('Error executing query:', err);
                        res.status(500).json({ message: 'Database query error' });
                      } else {
                        res.status(201).json({ message: username });
                        console.log('hashed password : ' + password)
                    }
                    }); 
                  }
                });
              }
            });
      }
    }
  });
})


app.post('/login', (req, res) => {
  const username = req.body.username;
  let enteredPassword = req.body.password;
  let password = '';
  const payload = { username: username };
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
    morningMessage: '',
    eveningMessage: '',
    user_id: ''
  };

  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, userResult) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (userResult.rows.length < 1) {
        res.status(409).json(noSuchUser);
      } else if (userResult.rows.length > 0) {
        const hashedPassword = userResult.rows[0].password;
        bcrypt.compare(enteredPassword, hashedPassword, function (err, passwordMatch) {
          if (err) {
            console.error('Error comparing passwords:', err);
            res.status(500).json({ message: 'Password comparison error' });
          } else {
            if (passwordMatch) {
              const user_id = userResult.rows[0].user_id;
              success.user_id = user_id;
              pool.query('SELECT * FROM morningplan WHERE user_id = $1', [user_id], (err, morningResult) => {
                if (err) {
                  console.error('Error executing query:', err);
                  res.status(500).json({ message: 'Database query error' });
                } else {
                  if (morningResult.rows.length > 0) {
                    let arrayLength = morningResult.rows.length;
                    success.morningMessage = morningResult.rows[arrayLength - 1].message;
                  } else {
                    success.morningMessage = '';
                  }
                  // Query the eveningdone table
                  pool.query('SELECT * FROM eveningdone WHERE user_id = $1', [user_id], (err, eveningResult) => {
                    if (err) {
                      console.error('Error executing query:', err);
                      res.status(500).json({ message: 'Database query error' });
                    } else {
                      if (eveningResult.rows.length > 0) {
                        let arrayLength = eveningResult.rows.length;
                        success.eveningMessage = eveningResult.rows[arrayLength - 1].message;
                        
                      } else {
                        success.eveningMessage = '';
                      }
                      console.log(success)
                      console.log("this does not show up in console log")
                      res.status(200).json(success);
                    }
                  });
                }
              });
            } else {
              res.status(409).json(wrongPassword);
            }
          }
        });
      }
    }
  });
});



app.post('/morningplan', (req, res) => {
  //console.log(req.body)
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
})


app.post('/eveningdone', (req, res) => {
  //console.log(req.body)
  const username = req.body.journalWriter;
  const message = req.body.eveningMessage;
  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
     res.status(500).json({ message: 'Database query error' });
    } else if (result.rows.length > 0) {
      const user_id = result.rows[0].user_id;
      pool.query('INSERT INTO eveningdone (user_id, date, message) VALUES ($1, $2, $3)', 
      [user_id, new Date(), message], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ message: 'Database query error' });
        } else {
        }
      }); 
    }
  })
})


app.post('/memories', (req, res) => {
  const user_id = req.body.theId;
  pool.query('SELECT * FROM memories WHERE memories.user_id = $1', [user_id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Database query error' });
    } else {
      res.status(200).json(result.rows); 
    }
  });
});


function deleteAllMorningPlanEntries() {
  pool.query('DELETE FROM morningplan', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.log('All morningplan entries deleted at midnight.');
    }
  });
}

function deleteAllEveningDoneEntries() {
  pool.query('DELETE FROM eveningdone', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.log('All eveningdone entries deleted at midnight.');
    }
  });
}

function moveMorningPlanEntriesToMemories() {
  pool.query(
    'INSERT INTO memories (user_id, date, message) ' +
    'SELECT user_id, date, message FROM morningplan ' +
    'WHERE (user_id, date) IN ' +
    '(SELECT user_id, MAX(date) FROM morningplan GROUP BY user_id)',
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
      } else {
        console.log('Most recent morningplan entries moved to memories.');
        deleteAllMorningPlanEntries();
      }
    }
  );
}

function moveEveningDoneEntriesToMemories() {
  pool.query(
    'INSERT INTO memories (user_id, date, message) ' +
    'SELECT user_id, date, message FROM eveningdone ' +
    'WHERE (user_id, date) IN ' +
    '(SELECT user_id, MAX(date) FROM eveningdone GROUP BY user_id)',
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
      } else {
        console.log('Most recent eveningdone entries moved to memories.');
        deleteAllEveningDoneEntries();
      }
    }
  );
}


cron.schedule('30 23 * * *', () => {
  moveMorningPlanEntriesToMemories();
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

