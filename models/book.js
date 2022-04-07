const { DataTypes } = require("sequelize");
const Joi = require("joi");

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
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

// Validate
const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(book);
};

module.exports = { BookModel, validateBook };
