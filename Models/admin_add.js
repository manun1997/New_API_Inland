const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  profile_url: String,
  role: String,
  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("admins", adminSchema);
