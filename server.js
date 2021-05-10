const express = require("express");

const app = express();

const port = 5000;
require("dotenv").config();
app.listen(port, () => console.log(` Server started at port ${port}`));

//auth0
const path = require("path");

const { auth } = require("express-openid-connect");
