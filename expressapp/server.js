const express = require("express");
const cors = require("cors");
const db = require("./src/database");
const userRouter = require("./src/routes/user.routes.js");
const postRouter = require("./src/routes/post.routes.js");
const commentRouter = require("./src/routes/comment.routes.js");
const replyRouter = require("./src/routes/reply.routes.js");
const reactionRouter = require("./src/routes/reaction.routes.js");
const followRouter = require("./src/routes/follow.routes.js");
const profileVisitRouter=require("./src/routes/profilevisit.routes.js");
const personVisitRouter=require("./src/routes/personvisit.routes.js");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add user routes
app.use("/api/users", userRouter);
//Add post routes
app.use("/api/post", postRouter);
//Add comment routes
app.use("/api/comment", commentRouter);
//Add reply routes
app.use("/api/reply", replyRouter);
//Add reaction routes
app.use("/api/reaction", reactionRouter);
//Add follow routes
app.use("/api/follow", followRouter);
//Add profileVisit routes
app.use("/api/profileVisit", profileVisitRouter);
//Add personVisit routes
app.use("/api/personVisit", personVisitRouter);
// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
