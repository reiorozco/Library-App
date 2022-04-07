const { Registry } = require("../models");

const createRegistry = async (userId, bookId) => {
  try {
    return await Registry.create({
      UserId: userId,
      BookId: bookId,
    });
  } catch (error) {
    console.error("Error in createRegistry: ", error.message);
  }
};

module.exports = { createRegistry };
