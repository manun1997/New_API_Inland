const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_address_schema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  address_type: String,
  house_no: String,
  floor_no: String,
  building_name: String,
  street_name: String,
  landmark: String,
  area_name: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("address", user_address_schema);
