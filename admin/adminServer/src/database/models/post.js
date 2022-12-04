module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "post",
    {
      post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ImageURL: {
        type: DataTypes.STRING(4000),
        isUrl: true, 
      },
      post_time: {
        type: DataTypes.DATE(6),
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
