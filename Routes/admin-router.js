const express = require("express");
const adminService = require("../Middlewares/admin-service");
const router = express.Router();

router.get("/admin", adminService.addAdmin);

module.exports = router;
