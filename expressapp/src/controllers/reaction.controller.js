const db = require("../database");

//get the count of dislike or like
exports.getReactionForAPost = async (req, res) => {
  const postPreferenceLike = await db.reaction.findAll({
    where: { post_id: req.query.post_id, preference: true },
  });

  const postPreferenceDisLike = await db.reaction.findAll({
    where: { post_id: req.query.post_id, preference: false },
  });

  const postPreferenceCount = {
    like: postPreferenceLike.length,
    dislike: postPreferenceDisLike.length,
  };


  res.json(postPreferenceCount);
};

//get the status of preference
exports.preferenceStatus = async (req, res) => {
  const postPreferenceStatus = await db.reaction.findOne({
    where: { user_id: req.query.user_id, post_id: req.query.post_id },
  });
  if (postPreferenceStatus === null) {
    res.json(null);
  }else{
    res.json(postPreferenceStatus);
  }
};

//give the preference for a post
exports.providePreference = async (req, res) => {
  const postPreferenceStatus = await db.reaction.findOne({
    where: { user_id: req.body.user_id, post_id: req.body.post_id },
  });
  if (postPreferenceStatus === null) {
    const preference = await db.reaction.create({
      preference: req.body.preference,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });

    res.json(preference);
  } else {
    await db.reaction.update(
      { preference: req.body.preference },
      {
        where: { user_id: req.body.user_id, post_id: req.body.post_id },
      }
    );
    const preference = await db.reaction.findOne({
      where: { user_id: req.body.user_id, post_id: req.body.post_id },
    });
    res.json(preference);
  }
};
