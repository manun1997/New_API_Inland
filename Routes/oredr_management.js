const express = require("express");
const router = express.Router();
const Orders = require("../Middlewares/order_services");

router.post("/add_orders", Orders.addorders);

module.exports = router;
