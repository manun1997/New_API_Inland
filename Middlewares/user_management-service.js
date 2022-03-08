const express = require("express");
const User = require("../Models/user_management-module");
const CryptoJS = require("crypto-js");

module.exports.adduser = (req, res, next) => {
  let userData = req.body;
  userData.status = "active";
  const user = new User(userData);
  user.password = CryptoJS.MD5(user.password).toString();

  user
    .save()
    .then((data) => {
      res.send({
        status: true,
        status_code: 200,
        message: "User registered successfully",
      });
      console.log(data);
    })
    .catch((err) => {
      res.send({
        status: true,
        status_code: 200,
        message: "Error in inserting user data",
      });
    });
};
