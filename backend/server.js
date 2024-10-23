const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");

//load environment variables
dotenv.config({ path: "./config.env" });

// Create express app
const app = express();
// It parses incoming requests with JSON payloads
app.use(express.json());
//  It parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

//  Start the server on port 5000
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${PORT} `)
);
