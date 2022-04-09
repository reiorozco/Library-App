const { Registry } = require("../models");

const findRegistry = async (userId, bookId, dateOut) => {
  try {
    return await Registry.findOne({
      where: {
        dateOut: dateOut,
        UserId: userId,
        BookId: bookId,
      },
    });
  } catch (error) {
    console.error("Error in findRegistry: ", error.message);
  }
};

const returnBook = async (userId, bookId, dateOut) => {
  try {
    await Registry.update(
      { dateReturned: new Date() },
      {
        where: {
          dateOut: dateOut,
          UserId: userId,
          BookId: bookId,
        },
      }
    );

    return await findRegistry(userId, bookId, dateOut);
  } catch (error) {
    console.error("Error in returnBook: ", error.message);
  }
};

module.exports = { findRegistry, returnBook };
