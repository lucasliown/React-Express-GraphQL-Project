module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "profilevisit",
    {
      visit_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      visitcount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "visitDate",
      updatedAt: false,
    }
  );
