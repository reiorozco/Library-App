const { DataTypes } = require("sequelize");

const BookModel = (connection) => {
  return connection.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = BookModel;
