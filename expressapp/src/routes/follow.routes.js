const express = require("express");
const followcontroller = require("../controllers/follow.controller.js");
const router = express.Router();

// get  follow status.
router.get("/followStatus/:followed_id/:following_id", followcontroller.getStatus);

// get  following list for a user.
router.get("/followingList/:following_id", followcontroller.followingList);

//get unfollowing list for a user..
router.get("/unfollowingList/:following_id", followcontroller.unfollowingList);

// follow a user.
router.post("/followAUser", followcontroller.followAUser);

//unfollow a user.
router.delete(
  "/unfollowAUser/:followed_id/:following_id",
  followcontroller.unfollowAUser
);

// Add routes to server.
module.exports = router;
