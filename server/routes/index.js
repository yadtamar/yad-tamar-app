
const express = require("express")
const devController = require("../controllers/dev")
const router = express.Router();

router.post("/", devController.createDev)