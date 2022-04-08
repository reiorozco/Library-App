const axios = require("axios");

const { Book } = require("../models");

const getBooks = async () => {
  try {
    const url = "https://api.itbook.store/1.0/new";
    const books = [];

    const { data } = await axios.get(url);
    data.books.map((b) => books.push({ title: b.title }));

    for (const b of books) {
      await Book.findOrCreate({
        where: {
          title: b.title,
        },
      });
    }
  } catch (error) {
    console.error("Error in getBooks: ", error.message);
  }
};

const createBook = async (title) => {
  try {
    return await Book.create({
      title: title,
    });
  } catch (error) {
    console.error("Error in createBook: ", error.message);
  }
};

const editTitleBook = async (id, title) => {
  try {
    await Book.update(
      {
        title: title,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return await Book.findByPk(id);
  } catch (error) {
    console.error("Error in editTitleBook: ", error.message);
  }
};

const deleteBook = async (id) => {
  try {
    const delBook = await Book.findByPk(id);

    await Book.destroy({
      where: {
        id: id,
      },
    });

    return delBook;
  } catch (error) {
    console.error("Error in deleteBook: ", error.message);
  }
};

module.exports = { getBooks, createBook, editTitleBook, deleteBook };
