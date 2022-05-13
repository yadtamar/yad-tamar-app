const serverless = require("serverless-http");
require("dotenv").config();
//const port = 5000;
const express = require("express");
const app = express(); //req.body
const cors = require("cors");
const pool = require("./db");
const taskController = require("./controllers/tasks.js");
const familyController = require("./controllers/families.js");
const voluteerController = require("./controllers/volunteers.js");

//middleware
app.use(cors());
app.use(express.json());

const port = 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

//ROUTES
//create family
app.post("/families", async (req, res) => {
  familyController.createFamily(req, res);
});

//create a new task
app.post("/Create_Task", (req, res) => {
  taskController.createTask(req, res);
});

//Create new Volunteer
app.post("/Create_Volunteer", async (req, res) => {
  voluteerController.createVoluteer(req, res);
});

//Get families
app.get("/families", async (req, res) => {
  familyController.getAllFamilies(req, res);
});

//Get all users
app.get("/users", async (req, res) => {
  voluteerController.getUsers(req, res);
});

//Get single family
app.get("/families/:family_id", async (req, res) => {
  familyController.getSingleFamily(req, res);
});

//get tasks for family
app.get("/tasks_for_family/:family_id", async (req, res) => {
  taskController.getTasksForFamily(req, res);
});

//get volunteers_for_family
app.get("/volunteers_for_family/:family_id", async (req, res) => {
  voluteerController.getFamilyVolunteers(req, res);
});

//Get single user
app.get("/users/:user_id", async (req, res) => {
  voluteerController.getUser(req, res);
});

//Get single task
app.get("/tasks/:task_id", async (req, res) => {
  taskController.getSingleTask(req, res);
});

//Update user- volunteer
app.put("/users/:user_id", async (req, res) => {
  voluteerController.updateVoluteer(req, res);
});

//update task
app.put("/tasks/:task_id", async (req, res) => {
  taskController.updateTask(req, res);
});

//update family
app.put("/families/:family_id", async (req, res) => {
  familyController.updateFamily(req, res);
});

//Delete family
app.delete("/families/:family_id", async (req, res) => {
  familyController.deleteFamily(req, res);
});

//Delete volunteer
app.delete("/delete_volunteer/:user_id", async (req, res) => {
  voluteerController.deleteVolunteer(req, res);
});

//Delete task
app.delete("/tasks/:task_id", async (req, res) => {
  taskController.deletetask(req, res);
});

module.exports.handler = serverless(app);
