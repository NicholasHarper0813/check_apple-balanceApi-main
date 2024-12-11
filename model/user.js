const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username is already registered"],
  },
  password: { type: String, required: true },
  ipAddress: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: [true, "Email Address is already registerd"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiredAt: {
    type: Date,
    default: function () {
      const today = new Date();
      return Date(today.getDate() + 1);
    },
  },
});

const model = mongoose.model("User", UserSchema);

module.exports = model;
