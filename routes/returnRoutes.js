const router = require("express").Router();

const { findRegistry, returnBook } = require("../controllers/returnController");

router.post("/", async (req, res) => {
  const { userId, bookId, dateOut } = req.body;
  const registry = await findRegistry(userId, bookId, dateOut);
  if (!registry) return res.status(404).send("Lend not found.");

  if (registry.dateReturned)
    return res.status(400).send("Return already processed.");

  const returnedBook = await returnBook(userId, bookId, dateOut);

  return res.send(returnedBook);
});

module.exports = router;
