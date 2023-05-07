require("dotenv").config();
const express = require("express");
const User = require("./models/User");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!(email && password && firstName && lastName)) {
    res.status(400).send("All filed are required!");
  }

  const existingUser = User.findOne({ email });

  if (existingUser) res.status(401).send("User already exists");

});

module.exports = app;
