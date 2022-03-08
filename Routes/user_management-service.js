const express = require("express");
const router = express.Router();
const userServices = require("../Middlewares/user_management-service");

router.post("/add-user", userServices.adduser);

module.exports = router;
