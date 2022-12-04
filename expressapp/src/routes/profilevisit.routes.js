const express = require("express");
const profileVisitcontroller = require("../controllers/profilevist.controller.js");
const router = express.Router();

// add new count for daily access others profile.
router.post("/addProfilevisitCount/:user_id", profileVisitcontroller.addVisitCount);

// Add routes to server.
module.exports = router;