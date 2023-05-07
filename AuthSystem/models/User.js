const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid email address"],
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
