const db = require("../database");

// Select all reply for a Post from the database.
exports.allReplyForComment = async (req, res) => {
  const replies = await db.reply.findAll({
    include: [
      {
        model: db.comment,
      },
      {
        model: db.user,
      },
    ],
    where: { comment_id: req.query.comment_id },
    order: [["reply_time", "DESC"]],
  });
  res.json(replies);
};

exports.createReply = async (req, res) => {
  // // Create a reply in the database.
  const reply = await db.reply.create({
    text: req.body.text,
    user_id: req.body.user_id,
    comment_id: req.body.comment_id,
  });
  res.json(reply);
};
