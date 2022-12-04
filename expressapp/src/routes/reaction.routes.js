const express = require("express");
const reactioncontroller = require("../controllers/reaction.controller.js");
const router = express.Router();

// Select all reaction for a post_id.
router.get("/getReactionForAPost", reactioncontroller.getReactionForAPost);

// Create a new Preference.
router.post("/providePreference", reactioncontroller.providePreference);

// get a new Preference status.
router.get("/preferenceStatus", reactioncontroller.preferenceStatus);


// Add routes to server.
module.exports = router;