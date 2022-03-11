const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderHistorySchema = new Schema({
  order_status: String,
  delivery_status: String,
  note: String,
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order_history", OrderHistorySchema);
