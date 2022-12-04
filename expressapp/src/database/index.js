const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const userModel = require("./models/user.js");
const postModel = require("./models/post.js");
const commentModel = require("./models/comment.js");
const replyModel = require("./models/reply.js");
const reactionModel = require("./models/reaction.js");
const followModel = require("./models/follow.js");
const profileVisitModel=require("./models/profilevisit.js")
const personVisitModel=require("./models/personvisit.js");
const argon2 = require("argon2");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = userModel(db.sequelize, DataTypes);
db.post = postModel(db.sequelize, DataTypes);
db.comment = commentModel(db.sequelize, DataTypes);
db.reply = replyModel(db.sequelize, DataTypes);
db.reaction = reactionModel(db.sequelize, DataTypes);
db.follow = followModel(db.sequelize, DataTypes);
db.profilevisit=profileVisitModel(db.sequelize, DataTypes);
db.personvisit=personVisitModel(db.sequelize, DataTypes);

//create a Relationship between post and user.
db.user.hasMany(db.post, { foreignKey: { name: "user_id", allowNull: false } });
db.post.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull: false },
});
//create a Relationship between post comment and user
db.user.hasMany(db.comment, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.comment.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.post.hasMany(db.comment, {
  foreignKey: { name: "post_id", allowNull: false },
});
db.comment.belongsTo(db.post, {
  foreignKey: { name: "post_id", allowNull: false },
});
//create a Relatinship between reply comment and user
db.user.hasMany(db.reply, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.reply.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.comment.hasMany(db.reply, {
  foreignKey: { name: "comment_id", allowNull: false },
});
db.reply.belongsTo(db.comment, {
  foreignKey: { name: "comment_id", allowNull: false },
});
//create a Relatinship between reaction post and user
db.user.hasMany(db.reaction, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.reaction.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.post.hasMany(db.reaction, {
  foreignKey: { name: "post_id", allowNull: false },
});
db.reaction.belongsTo(db.post, {
  foreignKey: { name: "post_id", allowNull: false },
});
//create a Relationship between user another user and follow table
db.user.belongsToMany(db.user, {
  as: "following",
  through: db.follow,
  foreignKey: { name: "following_id", allowNull: false },
});
db.user.belongsToMany(db.user, {
  as: "followed",
  through: db.follow,
  foreignKey: { name: "followed_id", allowNull: false },
});
// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

//create a Relationship between user and Profile visit 
db.user.hasMany(db.profilevisit, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.profilevisit.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull: false },
});


// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) {
    return;
  }

  let hash = await argon2.hash("1111", { type: argon2.argon2id });
  await db.user.create({
    username: "kaige",
    email: "1111@126.com",
    password_hash: hash,
    join_Date: "Thu 28 Jul 2022",
  });

  hash = await argon2.hash("2222", { type: argon2.argon2id });
  await db.user.create({
    username: "lingjie",
    email: "2222@126.com",
    password_hash: hash,
    join_Date: "Thu 27 Jul 2022",
  });

  hash = await argon2.hash("3333", { type: argon2.argon2id });
  await db.user.create({
    username: "wangge",
    email: "3333@126.com",
    password_hash: hash,
    join_Date: "Thu 26 Jul 2022",
  });
}

module.exports = db;
