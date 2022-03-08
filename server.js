const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./Routes/user_management-service");
const adminRoutes = require("./Routes/admin-router");

app.use(express.json());
app.use(express.urlencoded());
app.use(user);
app.use(adminRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/New_API_Inland", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("mongodb is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(4030, () => {
  console.log("Server is Running on 4030 port");
});
