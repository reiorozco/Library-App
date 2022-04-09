const dbConnection = require("../startup/database");

const { BookModel } = require("./book");
const { UserModel } = require("./user");
const registry = require("./registry");

const Book = BookModel(dbConnection);
const User = UserModel(dbConnection);
const Registry = registry(dbConnection);

User.belongsToMany(Book, { through: "Registry" });
Book.belongsToMany(User, { through: "Registry" });
Registry.belongsTo(Book);
Registry.belongsTo(User);

module.exports = {
  Book,
  User,
  Registry,
};
