const serverless = require('serverless-http');
require("dotenv").config();
const port = 5000;
const express = require("express");
const app = express(); //req.body
const cors = require("cors");
const pool = require("./db");
const router = require('express').Router();
const voluneerRouter = require('./routes/volunteers');
const familyRouter = require('./routes/families');
const taskRouter = require('./routes/tasks');
const auth = require('./routes/auth');
//const authorization = require('')
const bodyParser = require("body-parser")
const expressValidator = require("express-validator");
const expressSession = require("express-session");

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressSession({secret: 'michael', saveUninitialized: false, resave: false}))
app.listen(port, function (err) {
  console.log("welcome to Yad tamar app!")
  if (err) {
   res.send(err);
  }
})
router.get("/", (req, res, next) => {
  // res.render('index', {title:"validation", seccess: req.session.seccess, errors: req.session.errors})
  // req.session.errors = null;
  app.use("/auth", auth.authorization)
})

 app.use("/volunteers", voluneerRouter);
 app.use("/tasks", taskRouter)
 app.use("/families", familyRouter);
 app.use("/auth", auth)

module.exports.handler = serverless(app);
