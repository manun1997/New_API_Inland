const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./Routes/user_management-service");
const adminRoutes = require("./Routes/admin-router");
const swaggerJsdoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = YAML.load("swagger.yaml");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use(user);
app.use(adminRoutes);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
