const express = require("express");
const postcontroller = require("../controllers/post.controller.js");
const router = express.Router();

// Select all users.
router.get("/", postcontroller.allPost);

//Select all post for a user with id.
router.get("/getAllPost/:user_id", postcontroller.allPostForUser);

//Create a new Post.
router.post("/create", postcontroller.createPost);

//update the post in the database
router.put("/update/:post_id", postcontroller.update);

//delete the post in the database
router.delete("/delete/:post_id", postcontroller.delete);

// Add routes to server.
module.exports = router;