module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "reaction",
    {
      reaction_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      preference: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
