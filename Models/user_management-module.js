const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your email"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please Provide your  Number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide your  Number"],
  },
  profile_image: String,
  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
