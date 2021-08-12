const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;
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

const dev_config = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PASSWORD,
  port: process.env.PG_PORT,
};

const dev_config2 = `postgresql://${process.env.PG_USER}:${process.env.PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`;

const pro_config = process.env.DATABASE_URL; //heroku stuff
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production' ? pro_config : dev_config2,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

// receiving user data and the showid user chose from browse page and then adding it into the db
app.post('/api/post/add', async (req, resp) => {
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

  await pool.query(if_exists_query, (err, res) => {
    if (res && res.rows) {
      duplicate_entry = true ? res.rows[0].exists : false;
    }
  });
  if (!duplicate_entry) {
    let insert_query = {
      text: `insert into user_data_table (user_email, show_id) values ($1,$2)`,
      values: [user_email, show_id],
    };
    await pool.query(insert_query, (err, res) => {
      if (err) {
        console.log(err.stack);
      }
    });
  }
  resp.send('insert request received from node');
});

app.post('/api/post/remove', async (req, resp) => {
  let req_body = req.body;
  let user_email = req_body.user.name;
  let show_id = req_body.showID;

  let remove_query = {
    text: `delete from user_data_table where user_email = $1 and show_id = $2`,
    values: [user_email, show_id],
  };
  await pool.query(remove_query, (err, res) => {
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
  await pool.query(get_query, (err, res) => {
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

// code for heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}
