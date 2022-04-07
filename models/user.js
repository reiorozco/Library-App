const { DataTypes } = require("sequelize");
const Joi = require("joi");

const UserModel = (connection) => {
  return connection.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

// Validate
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(21).required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  return schema.validate(user);
};

module.exports = { UserModel, validateUser };
