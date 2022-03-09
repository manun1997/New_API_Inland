const express = require("express");
const router = express.Router();
const userServices = require("../Middlewares/user_management-service");

router.post("/add-user", userServices.adduser);
router.get("/view-user", userServices.viewuser);
router.post("/add_user_address", userServices.add_user_address);
router.get("/userdata_with_address/:id", userServices.userdata);
router.put("/single_user_data/:id", userServices.singleuserdata);
router.delete("/delete_single_user/:id", userServices.deleteuser);
router.delete(
  "/delete_same_user_diffcollection/:id",
  userServices.deletemanyuser
);
module.exports = router;
