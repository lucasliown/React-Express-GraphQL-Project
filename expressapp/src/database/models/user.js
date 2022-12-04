module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      join_Date: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },
      blockStatus:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull: false,
      }
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
