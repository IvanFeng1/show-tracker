const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors');

const port = 5000;
require('dotenv').config();
app.listen(port, () => console.log(` Server started at port ${port}`));

// stuff for making post request from front end to node (this) work
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// receiving body from react
app.post('/api', (req, resp) => {
  console.log(req.body);
  resp.send('post request received from node');
});

const path = require('path');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: process.env.PASSWORD,
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

const query = `
SELECT *
FROM dog 
`;

pool
  .connect()
  .then((client) => {
    client
      .query(query)
      .then((res) => {
        for (let row of res.rows) {
          console.log(row);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });
