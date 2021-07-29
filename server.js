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

// receiving user data and the showid user chose from browse page and then adding it into the db
app.post('/api/post/add', (req, resp) => {
  let req_body = req.body;
  let user_email = req_body.user.name;
  let show_id = req_body.showID;
  let duplicate_entry = false;
  // add a check to see if a row is already in teh db
  let if_exists_query = {
    text:
      'select exists (select 1 from user_data_table where user_email = $1 and show_id = $2)',
    values: [user_email, show_id],
  };

  pool.query(if_exists_query, (err, res) => {
    if (res && res.rows) {
      duplicate_entry = true ? res.rows[0].exists : false;
    }
  });
  if (!duplicate_entry) {
    let insert_query = {
      text: `insert into user_data_table (user_email, show_id) values ($1,$2)`,
      values: [user_email, show_id],
    };
    pool.query(insert_query, (err, res) => {
      if (err) {
        console.log(err.stack);
      }
    });
  }
  resp.send('insert request received from node');
});

app.post('/api/post/remove', (req, resp) => {
  let req_body = req.body;
  let user_email = req_body.user.name;
  let show_id = req_body.showID;

  let remove_query = {
    text: `delete from user_data_table where user_email = $1 and show_id = $2`,
    values: [user_email, show_id],
  };
  pool.query(remove_query, (err, res) => {
    if (err) {
      console.log(err.stack);
    }
  });
  resp.send('remove request received from node');
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
