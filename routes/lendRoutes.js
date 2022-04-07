const router = require("express").Router();

const { Book, User, Registry } = require("../models");
const { createRegistry } = require("../controllers/lendController");

router.get("/", async (req, res) => {
  const registry = await Registry.findAll({ order: [["dateOut", "DESC"]] });

  res.send(registry);
});

router.post("/", async (req, res) => {
  const { userId, bookId } = req.body;

  const findUser = await User.findByPk(userId);
  if (!findUser) return res.status(400).send("Invalid User.");

  const findBook = await Book.findByPk(bookId);
  if (!findBook) return res.status(400).send("Invalid Book.");

  const newRegistry = await createRegistry(userId, bookId);

  res.send(newRegistry);
});

module.exports = router;
