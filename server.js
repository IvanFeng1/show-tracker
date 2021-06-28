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
app.use(express.urlencoded({ extended: true }));

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

// receiving user data and the showid user chose from browse page
app.post('/api/post', (req, resp) => {
  let req_body = req.body;
  let user_data = req_body.user.name;
  let show_id = req_body.showID;
  let insert_query = {
    text: `insert into user_data_table (user_email, show_id) values ($1,$2)`,
    values: [user_data, show_id],
  };
  pool.query(insert_query, (err, res) => {
    if (err) {
      console.log(err.stack);
    }
  });
  resp.send('post request received from node');
});

// getting list of ids from db
app.get('/api/get', (req, resp) => {
  let user_email = req.query.user_email;
  let get_query = {
    text: 'select show_id from user_data_table where user_email = $1',
    values: [user_email],
  };
  pool.query(get_query, (err, res) => {
    if (err) {
      console.log(err.stack);
    }
    if (res) {
      let show_id_arr = [];
      for (let row of res.rows) {
        show_id_arr.push(row.show_id);
      }

      resp.send(show_id_arr);
    }
  });
});
