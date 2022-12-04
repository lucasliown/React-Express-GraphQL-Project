const express = require("express");
const replycontroller = require("../controllers/reply.controller.js");
const router = express.Router();

// // Select all post for a user with id.
router.get("/getAllReply", replycontroller.allReplyForComment);

// // Create a new Post.
router.post("/create", replycontroller.createReply);

// Add routes to server.
module.exports = router;