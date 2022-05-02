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

//middleware
app.use(cors());
app.use(express.json());

 const port = process.env.PORT;

console.log(process.env.PORT)
app.listen(port, function (err) {
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
