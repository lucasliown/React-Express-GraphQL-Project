const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();
  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findOne({
    where: { user_id: req.params.user_id },
  });
  if (user === null) {
    console.log("Not Found");
    res.json(null);
  } else {
    res.json(user);
  }
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({ where: { email: req.query.email } });

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: hash,
    join_Date: req.body.join_Date,
  });
  res.json(user);
};

//update the user in the database
exports.update = async (req, res) => {
  await db.user.update(
    { email: req.body.email, username: req.body.username },
    {
      where: {
        user_id: req.params.user_id,
      },
    }
  );
  const user = await db.user.findOne({
    where: { user_id: req.params.user_id },
  });
  res.json(user);
};

//delete the user in the database
exports.delete = async (req, res) => {
  await db.user.destroy({
    where: {
      user_id: req.params.user_id,
    },
  });
  res.json("delete user: " + req.params.user_id);
};
