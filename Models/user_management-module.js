const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  profile_image: String,
  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
