const db = require("../database/index");

//find blogger that have Top 10 follower
const findTopFollowed = async () => {
  const users = [];
  const followList = await db.user.findAll({
    include: {
      model: db.user,
      as: "followed",
    },
  });

  for (const follow of followList) {
    const followingUserArray = [];
    for (const followingUser of follow.dataValues.followed) {
      if (followingUser === undefined) {
        continue;
      }
      followingUserArray.push(followingUser.dataValues);
    }
    follow.dataValues.following = followingUserArray;
    users.push(follow.dataValues);
  }
  const userCountFollow = [];
  for (const userdetail of users) {
    const user = {
      username: userdetail.username,
      following_count: userdetail.following.length,
    };
    userCountFollow.push(user);
  }
  userCountFollow.sort(objectSort("following_count"));
  if (userCountFollow.length <= 10) {
    return userCountFollow;
  } else {
    return userCountFollow.slice(0, 10);
  }
};

//for sort the data in the object
function objectSort(count) {
  return function (obj1, obj2) {
    return obj2[count] - obj1[count];
  };
}

//find all profile visit count
const findUserPorfileVisitCount = async (userID) => {
  const profileVisit = await db.profilevist.findAll({
    include: {
      model: db.user,
    },
    where: { user_id: userID },
    order: [["visitDate", "DESC"]],
  });
  return profileVisit;
};

//find all like reaction count
const findPostReactionLikeCount = async (userID) => {
  const postLike = await db.post.findAll({
    include: {
      model: db.reaction,
      where: {
        preference: true,
      },
    },
    where: { user_id: userID },
    order: [["post_time", "DESC"]],
  });
  const postArray = [];
  for (const post of postLike) {
    postCount = {
      post_id: post.post_id,
      post_time: post.post_time,
      likeCount: post.reactions.length,
    };
    postArray.push(postCount);
  }
  postArray.sort(objectSort("likeCount"));
  return postArray;
};

//find all dislike reaction count
const findPostReactionDislikeCount = async (userID) => {
  const postDislike = await db.post.findAll({
    include: {
      model: db.reaction,
      where: {
        preference: false,
      },
    },
    where: { user_id: userID },
    order: [["post_time", "DESC"]],
  });
  const postArray = [];
  for (const post of postDislike) {
    postCount = {
      post_id: post.post_id,
      post_time: post.post_time,
      dislikeCount: post.reactions.length,
    };
    postArray.push(postCount);
  }
  postArray.sort(objectSort("dislikeCount"));
  return postArray;
};

//find all personVisit everyday
const findallPsersonVisit = async () => {
  const personvisit = await db.personvisit.findAll({order: [["visitDate", "DESC"]]});
  return personvisit;
};

module.exports = {
  findTopFollowed,
  findUserPorfileVisitCount,
  findPostReactionLikeCount,
  findPostReactionDislikeCount,
  findallPsersonVisit,
};
