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

// receiving body from react
app.post('/api', (req, resp) => {
  console.log(req.body);
  let req_body = req.body;
  let user_data = req_body.user.name;
  let show_id = req_body.showID;
  let insert_query = {
    text: `insert into user_data_table (user_email, show_id) values ($1,$2)`,
    values: [user_data, show_id],
  };
  let query_params = pool.query(insert_query, (err, res) => {
    if (err) {
      console.log(err.stack);
    }
  });
  resp.send('post request received from node');
});
