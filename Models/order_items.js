const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
  item_id: String,
  item_name: String,
  quantity: Number,
  price: String,
  total: String,
  uom: String,

  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order_items", itemSchema);
