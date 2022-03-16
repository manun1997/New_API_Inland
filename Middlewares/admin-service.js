const express = require("express");
const multer = require("multer");
const Add_admin = require("../Models/admin_add");
var common = require("../configaration/Token");
const jwt = require("jsonwebtoken");

module.exports.addAdmin = (req, res, next) => {
  let admindata = req.body;
  admindata.status = "active";
  const admin = new Add_admin(admindata);
  admin
    .save()
    .then((data) => {
      if (data) {
        res.send({
          status: true,
          status_code: 200,
          message: "Admin Added Successfully",
        });
      } else {
        res.send({
          status: false,
          status_code: 400,
          message: "Admin Not able to add",
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        status_code: 202,
        message: "There Was error to save admin data",
      });
    });
};

module.exports.adminLogin = (req, res, next) => {
  Add_admin.findOne(
    {
      email: req.body.email,
      password: req.body.password,
    },
    function (err, data) {
      if (err) {
        res.send("Admin Not Found");
      }
      if (data) {
        common.generateToken(data, function (err, token) {
          if (err) {
            res.send({
              status: false,
              status_code: 203,
              message: "Error on Admin Login",
            });
          } else {
            res.send({
              status: true,
              status_code: 200,
              message: "Admin Login successfull",
              token: token,
            });
          }
        });
      } else {
        res.send({
          status: false,
          status_code: 400,
          message: "Email And Pasword Not Matches",
        });
      }
    }
  );
};
