const serverless = require('serverless-http');
require("dotenv").config();
//const port = 5000;
const express = require("express");
const app = express(); //req.body
const cors = require("cors");
const pool = require("./db");
const voluneerRouter = require('./routes/volunteers');
const familyRouter = require('./routes/families');
const taskRouter = require('./routes/tasks');
//const devRouter = require('./routes');

//middleware
app.use(cors());
app.use(express.json());

const port = 5000;

app.listen(port, function (err) {
  console.log("welcome to Yad tamar app!")
  if (err) {
   res.send(err);
  }
})

 app.use("/volunteers", voluneerRouter);
 app.use("/tasks", taskRouter)
 app.use("/families", familyRouter);
 //app.use("/dev", devRouter)

module.exports.handler = serverless(app);
