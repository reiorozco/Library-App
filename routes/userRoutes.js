const router = require("express").Router();

const {
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");
const { User } = require("../models");
const validate = require("../middleware/validate");
const { validateUser } = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    order: [["id"]],
  });

  return res.send(users);
});

router.get("/:id", async (req, res) => {
  const lend = await User.findByPk(req.params.id);

  if (!lend) return res.status(404).send("This lend wasn't found.'");

  res.send(lend);
});

router.post("/", validate(validateUser), async (req, res) => {
  const { name, phone, email } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user)
    return res.send({ user, message: "User with this email already exist." });

  const newUser = await createUser(name, phone, email);

  return res.send({
    user: newUser,
    message: "New user created successfully",
  });
});

router.put("/:id", validate(validateUser), async (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  const editedUser = await editUser(id, name, phone, email);

  return res.send(editedUser);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const delUser = await deleteUser(id);

  return res.send(delUser);
});

module.exports = router;
