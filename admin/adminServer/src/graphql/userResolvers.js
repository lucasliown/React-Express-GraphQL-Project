const db = require("../database/index");

//find all user for userList
const findAllUser = async () => {
  return await db.user.findAll();
};

//chnage status for block User
const blockOrUnblockUser = async (userID, block_Status) => {
  const user = await db.user.update(
    { blockStatus: block_Status },
    {
      where: {
        user_id: userID,
      },
    }
  );
  const userChange = await db.user.findByPk(userID);
  return userChange;
};

module.exports = {
  findAllUser,
  blockOrUnblockUser,
};
