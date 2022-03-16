const express = require("express");
const Orders = require("../Models/user_order");
const Item = require("../Models/order_items");
const CryptoJS = require("crypto-js");
var common = require("../configaration/Token");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports.addorders = (req, res, next) => {
  const items = req.body.item;
  const orderdata = req.body;
  orderdata.status = "active";

  const order = new Orders(orderdata);

  order.save().than((data) => {
    items.forEach((itm) => {
      itm.order_id = data._id;
      itm.status = "active";
      const orderItem = new Item(itm);
      orderItem
        .save()
        .then((oderitm) => {
          res.send({
            staus: true,
            status_code: 200,
            message: "User Order Item successfully",
          });
        })
        .catch((err) => {
          res.send({
            status: false,
            status_code: 200,
            message: "invalid response",
          });
        });
    });
  });
};
