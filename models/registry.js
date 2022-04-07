const { DataTypes } = require("sequelize");

const RegistryModel = (connection) => {
  return connection.define(
    "Registry",
    {
      dateOut: {
        type: DataTypes.DATE,
        allowNull: false,
        default: Date.now,
      },
      dateReturned: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = RegistryModel;
