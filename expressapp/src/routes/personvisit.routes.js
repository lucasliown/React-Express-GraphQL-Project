const express = require("express");
const personVisitcontroller = require("../controllers/personvisit.controller.js");
const router = express.Router();

// add new count for daily access others profile.
router.post("/addPersonvisitCount", personVisitcontroller.addPersonVisitCount);

// Add routes to server.
module.exports = router;