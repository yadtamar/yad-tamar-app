const serverless = require('serverless-http');
require("dotenv").config();
const express = require("express");
const app = express(); 
const cors = require("cors");
const pool = require("./db");
const voluneerRouter = require('./routes/volunteers');
const familyRouter = require('./routes/families');
const taskRouter = require('./routes/tasks');

//middleware
app.use(cors());
app.use(express.json());

 const port = 5000;

app.listen(port, function (err) {
  console.log("welcome to Yad tamar app!")
  if (err) {
   console.log(err);
  }
})

app.use("/volunteers", voluneerRouter);
app.use("/tasks", taskRouter);
app.use("/families", familyRouter);

 app.use("/volunteers", voluneerRouter);
 app.use("/tasks", taskRouter)
 app.use("/families", familyRouter);

module.exports.handler = serverless(app);
