const { Registry } = require("../models");

const findRegistry = async (userId, bookId) => {
  try {
    return await Registry.findOne({
      where: {
        UserId: userId,
        BookId: bookId,
      },
    });
  } catch (error) {
    console.error("Error in findRegistry: ", error.message);
  }
};

const returnBook = async (userId, bookId) => {
  try {
    await Registry.update(
      { dateReturned: new Date() },
      {
        where: {
          UserId: userId,
          BookId: bookId,
        },
      }
    );

    return await findRegistry(userId, bookId);
  } catch (error) {
    console.error("Error in returnBook: ", error.message);
  }
};

module.exports = { findRegistry, returnBook };
