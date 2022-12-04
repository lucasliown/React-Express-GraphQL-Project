const express = require("express");
const commentcontroller = require("../controllers/comment.controller.js");
const router = express.Router();

// Select all comment for a user with id.
router.get("/getAllComment", commentcontroller.allCommentForPost);

// Create a new comment.
router.post("/create", commentcontroller.createComment);

// Add routes to server.
module.exports = router;