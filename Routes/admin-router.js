const express = require("express");
const adminService = require("../Middlewares/admin-service");
const router = express.Router();

router.post("/add_admin", adminService.addAdmin);
router.post("/admin_login", adminService.adminLogin);

module.exports = router;
