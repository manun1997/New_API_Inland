const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  order_id: Number,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  username: String,
  mobile: String,
  email: String,
  address_type: String,
  delivery_address: String,
  invoice_address: String,

  payment_status: String,
  mode_of_payment: String,
  items_total: String,
  delivery_charge: String,
  total_amount: Number,
  transaction_reference: String,

  delivery_status: String,
  tracking_id: String,
  delivery_partner: String,
  delivery_contact: String,

  order_status: String,
  order_note: String,

  status: String,
});
module.exports = mongoose.model("orderschema", ordersSchema);
