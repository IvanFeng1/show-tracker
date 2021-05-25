const express = require("express");

const app = express();

const port = 5000;
require("dotenv").config();
app.listen(port, () => console.log(` Server started at port ${port}`));

//auth0
const path = require("path");

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: process.env.PASSWORD,
  port: 5432,
});

pool.on("error", (err, client) => {
  console.error("Error:", err);
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
