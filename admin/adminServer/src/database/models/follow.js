module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "follow",
    {
      follow_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
     
    },
 
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
