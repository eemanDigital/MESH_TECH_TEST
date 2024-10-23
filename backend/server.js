const express = require("express");
const dotenv = require("dotenv").config();

// Create express app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//  Start the server on port 5000
app.listen(5000, () => console.log("Server is running on port 5000"));
