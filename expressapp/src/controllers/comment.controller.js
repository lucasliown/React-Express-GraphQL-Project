const db = require("../database");

// Select all comment for a Post from the database.
exports.allCommentForPost = async (req, res) => {
  const comments = await db.comment.findAll({
    include: [
      {
        model: db.post,
      },
      {
        model: db.user,
        // where: {
        //   user_id: { [db.Op.col]: "comment.user_id" },
        // },
      },
    ],
    where: { post_id: req.query.post_id },
    order: [["comment_time", "DESC"]],
  });
  res.json(comments);
};

exports.createComment = async (req, res) => {
  // // Create a comment in the database.
  const comment = await db.comment.create({
    text: req.body.text,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  });
  res.json(comment);
};
