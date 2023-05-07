require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./models/User");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!(email && password && firstName && lastName)) {
    res.status(400).send("All filed are required!");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(401).send("User already exists");
  } catch (error) {
    console.log("Error in finding user", error);
  }
});

module.exports = app;
