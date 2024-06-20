const express = require("express");
const { connect } = require("./db");
const userRouter = require("./controllers/user.controller");
var cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  try {
    connect;
    console.log("connection to db success");
  } catch (error) {
    console.log(error);
    console.log("db connection failed");
  }

  console.log("port is listening");
});
