const express = require("express");
const usercontroller = require("../controllers/user.controller.js");
const router = express.Router();

// Select all users.
router.get("/", usercontroller.all);

// Select a single user with id.
router.get("/select/:email", usercontroller.one);

// Select one user from the database if username and password are a match.
router.get("/login", usercontroller.login);

// Create a new user.
router.post("/create", usercontroller.create);

//update the user in the database
router.put("/update/:user_id", usercontroller.update);

//delete the user in the database
router.delete("/delete/:user_id", usercontroller.delete);

// Add routes to server.
module.exports = router;
