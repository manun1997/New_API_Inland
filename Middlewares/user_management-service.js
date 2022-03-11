const express = require("express");
const User = require("../Models/user_management-module");
const Address = require("../Models/user_address");
const CryptoJS = require("crypto-js");
var common = require("../configaration/Token");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const morgon = require("morgan");
const logger = require("../logger");
const err = {};
Error.captureStackTrace(err);

module.exports.adduser = (req, res, next) => {
  let userData = req.body;
  userData.status = "active";
  const user = new User(userData);
  user.password = CryptoJS.MD5(user.password).toString();
  const response = req.responseBody;
  // common.checkToken(req, res, (uData, token) => {
  user
    .save()
    .then((data) => {
      const successoperation = "User Data Saved successfully";

      res.send({
        status: true,
        status_code: 200,
        message: "User registered successfully",
      });
      logger.log("info", { message: userData });
    })
    .catch((err) => {
      res.send({
        status: true,
        status_code: 200,
        message: "Error in inserting user data",
      });
      logger.log("error", { message: err.stack });
    });
  // });
};

module.exports.userlogin = (req, res, next) => {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    function (err, resp) {
      if (err) {
        res.send("User Not Found");
      }
      if (resp) {
        common.generateToken(resp, function (err, token) {
          if (err) {
            res.send({
              status: false,
              statuscode: "203",
              msg: "Something went wrong please try again.",
            });
          } else {
            res.send({
              status: true,
              statuscode: "200",
              msg: "Login successfully",
              token: token,
            });
            logger.log("info", { message: resp });
          }
        });
      } else {
        res.send({
          status: false,
          status_code: 203,
          message: "Invalid Operation",
        });

        logger.log("error", { message: err.stack });
      }
    }
  );
};

//View All the Users From Mangoose Data Base
module.exports.viewuser = (req, res, next) => {
  common.checkToken(req, res, (uData, token) => {
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
  });
};

// Add  Address To the user
module.exports.add_user_address = (req, res, next) => {
  common.checkToken(req, res, (uData, token) => {
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
  });
};

module.exports.userdata = (req, res, next) => {
  common.checkToken(req, res, (uData, token) => {
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
  });
};

module.exports.singleuserdata = (req, res, next) => {
  common.checkToken(req, res, (uData, token) => {
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
  });
};

module.exports.deleteuser = (req, res, next) => {
  common.checkToken(req, res, (uData, token) => {
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
  });
};

module.exports.deletemanyuser = (req, res, next) => {
  common.checkToken(req, res, (uData, token) => {
    User.deleteMany({ phone: req.body.phone })
      .then((data) => {
        if (data) {
          res.send({
            status: true,
            staus_code: 200,
            message: "Successfully all the data delete",
          });
        } else {
          res.send({
            status: false,
            status_code: 400,
            message: "Can't able to delete the data",
          });
        }
      })
      .catch((err) => {
        res.send({
          status: false,
          status_code: 203,
          message: err,
        });
      });
  });
};

module.exports.insertmanyuser = (req, res, next) => {
  User.insertMany(req.body)
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

module.exports.updatemanydata = (req, res, next) => {};
