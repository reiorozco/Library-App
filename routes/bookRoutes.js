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
  await getBooks();

  const books = await Book.findAll({
    order: [["id"]],
  });

  return res.send(books);
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
  const { title } = req.body;
  const editBook = await editTitleBook(id, title);

  return res.send(editBook);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const delBook = await deleteBook(id);

  return res.send(delBook);
});

module.exports = router;
