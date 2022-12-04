const db = require("../database/index");
let Filter = require("bad-words");

//check post for dirty word
const findAllPostWithCheck = async () => {
  const posts = await db.post.findAll({
    include: {
      model: db.user,
    },
    order: [["post_time", "DESC"]],
  });
  const outputPost = [];
  for (const postIndataBase of posts) {
    const post = {
      post_id: postIndataBase.post_id,
      text: postIndataBase.text,
      ImageURL: postIndataBase.ImageURL,
      post_time: postIndataBase.post_time,
      user_id: postIndataBase.user_id,
      DirtyWord: false,
      user: {
        user_id: postIndataBase.user.user_id,
        username: postIndataBase.user.username,
        email: postIndataBase.user.email,
        password_hash: postIndataBase.user.password_hash,
        join_Date: postIndataBase.user.join_Date,
        blockStatus: postIndataBase.user.blockStatus,
      },
    };
    var filter = new Filter();
    const result = filter.isProfane(postIndataBase.text);
    if (result === true) {
      post.DirtyWord = true;
    } else {
      post.DirtyWord = false;
    }
    outputPost.push(post);
  }
  return outputPost;
};

//disable the post for dirty word
const disablePostFromDatabase = async (postID, textFromWeb) => {
  await db.post.update(
    { text: textFromWeb },
    {
      where: {
        post_id: postID,
      },
    }
  );
  const post = await db.post.findOne({
    include: {
      model: db.user,
    },
    where: { post_id: postID },
  });
  const outputPost = {
    post_id: post.post_id,
    text: post.text,
    ImageURL: post.ImageURL,
    post_time: post.post_time,
    user_id: post.user_id,
    DirtyWord: false,
    user: {
      user_id: post.user.user_id,
      username: post.user.username,
      email: post.user.email,
      password_hash: post.user.password_hash,
      join_Date: post.user.join_Date,
      blockStatus: post.user.blockStatus,
    },
  };
  return outputPost;
};

module.exports = {
  findAllPostWithCheck,
  disablePostFromDatabase,
};
