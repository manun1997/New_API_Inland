const express = require("express");
const User = require("../Models/user_management-module");
const Address = require("../Models/user_address");
const CryptoJS = require("crypto-js");
var common = require("../configaration/Token");
const mongoose = require("mongoose");

module.exports.adduser = (req, res, next) => {
  let userData = req.body;
  userData.status = "active";
  const user = new User(userData);
  user.password = CryptoJS.MD5(user.password).toString();
  // common.checkToken(req, res, (uData, token) => {
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
  // });
};

//View All the Users From Mangoose Data Base
module.exports.viewuser = (req, res, next) => {
  User.find({ status: "active" })
    .then((user) => {
      let meg;

      if (user.length == 0) {
        msg = "No User Data Found";
      } else {
        msg = " Data Found";
      }
      res.send({
        status: true,
        status_code: 200,
        message: msg,
        data: user,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        status_code: 200,
        message: "Error to show Data",
      });
    });
};

// Add  Address To the user
module.exports.add_user_address = (req, res, next) => {
  let userdata = req.body;
  userdata.status = "active";
  const address = new Address(userdata);
  address
    .save()
    .then((data) => {
      res.send({
        status: true,
        status_code: 200,
        message: "User Address Data Updated Successfully",
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        status_code: 203,
        message: "User Adress not Updated successfully",
      });
    });
};

module.exports.userdata = (req, res, next) => {
  User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
        status: "active",
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "user_id",
        as: "Address",
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.log("Error in Operation", err);
    }
    if (result) {
      res.send({
        status: true,
        status_code: 200,
        message: "Fething User Data successfull",
        user: result,
      });
    }
  });
};

module.exports.singleuserdata = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      console.log(data);
      if (data) {
        res.send({
          status: true,
          status_code: 200,
          message: data,
        });
      } else {
        res.send({
          status: false,
          status_code: 200,
          message: "unsuccessful",
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        status_code: 200,
        message: "Unssuccessfull Operation",
      });
    });
};

module.exports.deleteuser = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, { status: "inactive" })

    .then((data) => {
      if (data) {
        res.send({
          status: true,
          status_code: 200,
          message: "Successfully User Data deleted",
        });
      } else {
        res.send({
          status: true,
          status_code: 200,
          message: "Unsuccessfull Delete Operation",
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        status_code: 203,
        message: "Error While Delete The User Data",
      });
    });
};
