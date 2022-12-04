module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "comment",
    {
      comment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      comment_time: {
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
