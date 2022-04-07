const { User } = require("../models");

const createUser = async (name, phone, email) => {
  try {
    return await User.create({
      name: name,
      phone: phone,
      email: email,
    });
  } catch (error) {
    console.error("Error in createUser: ", error.message);
  }
};

const editUser = async (id, name, phone, email) => {
  try {
    await User.update(
      {
        name: name,
        phone: phone,
        email: email,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return await User.findByPk(id);
  } catch (error) {
    console.error("Error in editUser: ", error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const delUser = await User.findByPk(id);

    await User.destroy({
      where: {
        id: id,
      },
    });

    return delUser;
  } catch (error) {
    console.error("Error in deleteUser: ", error.message);
  }
};

module.exports = { createUser, editUser, deleteUser };
