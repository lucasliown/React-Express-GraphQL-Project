const db = require("../database");

// Select all Post from the database.
exports.allPost = async (req, res) => {
  const posts = await db.post.findAll({
    include: {
      model: db.user,
    },
    order: [["post_time", "DESC"]],
  });
  res.json(posts);
};

// Select one user from the database.
exports.allPostForUser = async (req, res) => {
  const posts = await db.post.findAll({
    include: [
      {
        model: db.user,
      },
    ],
    where: { user_id: req.params.user_id },
    order: [["post_time", "DESC"]],
  });
  res.json(posts);
};

exports.createPost = async (req, res) => {
  // // Create a post in the database.
  const post = await db.post.create({
    text: req.body.text,
    ImageURL: req.body.ImageURL,
    user_id: req.body.user_id,
  });
  res.json(post);
};

// //update the post in the database
exports.update = async (req, res) => {
  await db.post.update(
    { text: req.body.text, ImageURL: req.body.ImageURL },
    {
      where: {
        post_id: req.params.post_id,
      },
    }
  );
  const post = await db.post.findOne({
    where: { post_id: req.params.post_id },
  });
  res.json(post);
};

//delete the post in the database
exports.delete = async (req, res) => {
  await db.post.destroy({
    where: {
      post_id: req.params.post_id,
    },
  });
  res.json("delete user: " + req.params.post_id);
};
