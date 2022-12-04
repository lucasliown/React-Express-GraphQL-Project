const db = require("../database");

// Select all comment for a Post from the database.
exports.getStatus = async (req, res) => {
  const followList = await db.user.findAll({
    include: {
      model: db.user,
      as: "following",
    },
    where: { user_id: req.params.following_id },
  });
  if (followList === null) {
    res.json(false);
  } else {
    res.json(followList);
  }
};

//find a list that user follow
exports.followingList = async (req, res) => {
  const followList = await db.user.findAll({
    include: {
      model: db.user,
      as: "following",
    },
    where: { user_id: req.params.following_id },
  });
  res.json(followList);
};

//find all user aren't follow by login user
exports.unfollowingList = async (req, res) => {
  const followListArray=[];
  const unfollowUser=[];
  const users = await db.user.findAll();
  const followList = await db.follow.findAll({
    where: { following_id: req.params.following_id },
  });
  for (const followed of followList) {
    followListArray.push(followed.dataValues.followed_id);
  }
  followListArray.push(req.params.following_id);
  for(const user of users){
    if(followListArray.includes(user.user_id)){
      continue;
    }
    unfollowUser.push(user);
  }

  res.json(unfollowUser);
};

//follow a user
exports.followAUser = async (req, res) => {
  const followData = await db.follow.create({
    followed_id: req.body.followed_id,
    following_id: req.body.following_id,
  });
  res.json(followData);
};

//unfollow a user
exports.unfollowAUser = async (req, res) => {
  await db.follow.destroy({
    where: {
      followed_id: req.params.followed_id,
      following_id: req.params.following_id,
    },
  });
  res.json("delete following data");
};
