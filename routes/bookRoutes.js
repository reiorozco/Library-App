const router = require("express").Router();

const {
  getBooks,
  createBook,
  editTitleBook,
  deleteBook,
} = require("../controllers/bookController");
const { Book } = require("../models");
const validate = require("../middleware/validate");
const { validateBook } = require("../models/book");

router.get("/", async (req, res) => {
  // // Test Error Handler
  // throw new Error("Could not get the books.");

  await getBooks();

  const books = await Book.findAll({
    order: [["id"]],
  });

  return res.send(books);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) return res.status(404).send("This book wasn't found.'");

  res.send(book);
});

router.post("/", validate(validateBook), async (req, res) => {
  const { title } = req.body;

  const book = await Book.findOne({
    where: {
      title: title,
    },
  });
  if (book) return res.status(400).send("Book already exist.");

  const newBook = await createBook(title);

  return res.send(newBook);
});

router.put("/:id", validate(validateBook), async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const editBook = await editTitleBook(id, title, status);

  return res.send(editBook);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const delBook = await deleteBook(id);

  return res.send(delBook);
});

module.exports = router;
