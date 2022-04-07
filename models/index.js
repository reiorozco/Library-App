const dbConnection = require("../startup/database");

const book = require("./book");
const user = require("./user");
const registry = require("./registry");

const Book = book(dbConnection);
const Registry = registry(dbConnection);
const User = user(dbConnection);

User.belongsToMany(Book, { through: "Registry" });
Book.belongsToMany(User, { through: "Registry" });

module.exports = {
  Book,
  Registry,
  User,
};
