const express = require("express");
const router = express.Router();
const userServices = require("../Middlewares/user_management-service");

router.post("/add-user", userServices.adduser);
router.post("/user_login", userServices.userlogin);
router.get("/view-user", userServices.viewuser);
router.post("/add_user_address", userServices.add_user_address);
router.get("/userdata_with_address/:id", userServices.userdata);
router.put("/single_user_data/:id", userServices.singleuserdata);
router.delete("/delete_single_user/:id", userServices.deleteuser);
router.delete("/delete_same_user_diffcollection", userServices.deletemanyuser);
router.post("/insert_many_users", userServices.insertmanyuser);
router.put("update_many/:id", userServices.updatemanydata);
router.post("/add_orders", userServices.add_orders);
module.exports = router;
