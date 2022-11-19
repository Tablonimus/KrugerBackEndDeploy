const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const TOKEN_KEY = "BVj543kpJ2POLN3PJPOl9nNNL84NL122A54";
////POST USER CONTROLLER/////////////////
async function createUser(identification, name, last_name, email, password) {
  if (!identification || !name || !last_name || !email)
    throw new Error("Incorrect Data ERROR");
  console.log("Inputs are filled");

  const newUser = await User.create({
    identification,
    name,
    last_name,
    email,
    password,
  });
  console.log(newUser);

  return `Usuario Creado Correctamente 👏👏👏`;
}
////////////FIND ALL DB INFO///////
async function getAllUsers() {
  try {
    const dbUsers = await User.findAll();
    const jsonUsersData = await Promise.all(
      dbUsers.map(async (users) => users.toJSON())
    );

    return jsonUsersData.filter((users) => users.deleted === false);
  } catch (error) {
    throw new Error("getAllUsers controller error");
  }
}
////EDIT USER---
async function patchUser(
  identification,
  name,
  last_name,
  email,
  adress,
  phone,
  birthdate,
  deleted,
  vaccination_status,
  vaccine_type,
  vaccine_dose,
  vaccine_date
) {
  try {
    const editUser = await User.update(
      {
        identification,
        name,
        last_name,
        email,
        adress,
        phone,
        birthdate,
        deleted,
        vaccination_status,
        vaccine_type,
        vaccine_dose,
        vaccine_date,
      },
      { where: { identification: identification } }
    );
    console.log(editUser);
    return `Usuario Editado Correctamente 👏👏👏`;
  } catch (error) {
    console.log(error.message);
  }
}
////LOGIN JWT-------------------------//
async function login(email, password) {
  console.log(email, password);
  const user = await User.findOne({ where: { email: email } });
  if (!user) throw new Error("Usuario no encontrado");
  if (user.deleted === true) throw new Error("Usuario baneado");
  // const passwordIsValid = await user.comparePassword(password, user.password);
  // if (!passwordIsValid) throw new Error("Contraseña incorrecta");
  const token = jwt.sign({ id: user.id }, TOKEN_KEY);
  return token;
}

const userId = async (id) => {
  try {
    const user = await User.findOne({ where: { id: id, deleted: false } });

    return user;
  } catch (error) {
    console.error(error);
  }
};
/////////////LOAD INFO TO DB//////////
async function loadAdmin() {
  console.log("Filling DB...");
  let identification = "0123456789";
  let name = "Kruger";
  let last_name = "Admin";
  let email = "admin@admin.com";
  let password = "admin";
  const newAdmin = await User.findOrCreate({
    where: {
      identification,
      name,
      last_name,
      email,
      password,
    },
  });
  console.log(newAdmin);
  console.log("The Admin has been loaded to DB");
  console.log("Ready to run...");
}

module.exports = {
  createUser,
  getAllUsers,
  patchUser,
  login,
  userId,
  loadAdmin,
};
