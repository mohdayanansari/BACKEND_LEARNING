require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//?=====>
const app = express();
app.use(express.json());
app.use(cookieParser());

const User = require("./models/User");
const isAuth = require("./middleware/auth");


app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/dashboard", isAuth, (req, res) => {
  res.send("Hello dashboard");
});

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All filed are required!");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(401).send("User already exists");
    const myEncPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: myEncPassword,
    });

    //token
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    //update or not
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.log("Error:", error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.send(400).send("Field is missing");
    }

    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      user.password = undefined;

      // res.status(200).json(user);
      // !using cookies
      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    } else {
      res.send(400).send("You are not registered! or password is incorrect");
    }
  } catch (error) {
    console.log("Login error", error);
  }
});

module.exports = app;
