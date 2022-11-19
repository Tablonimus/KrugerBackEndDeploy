const { Router } = require("express");
const router = Router();
const {
  createUser,
  getAllUsers,
  patchUser,
  login,
  userId,
} = require("../controllers/userControl");
const { User } = require("../db");

const verifyToken = require("../utils/middlewares/validateToken");

router.post("/login", async (req, res, next) => {
  console.log(req.body.email, req.body.password);
  try {
    const token = await login(req.body.email, req.body.password);
    const user = await User.findOne({ where: { email: req.body.email } });
    const id = user.id;
    res
      .header("token", token)
      .json({ error: null, data: { token }, id: { id } });
  } catch (error) {
    next(error);
  }
});
//----------------------------//
router.post("/create", async (req, res) => {
  const { identification, name, last_name, email, password } = req.body;
  try {
    console.log(identification, name, last_name, email, password);
    const user = await createUser(
      identification,
      name,
      last_name,
      email,
      password
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//-------
router.patch("/edit", async (req, res) => {
  console.log("body:", req.body);
  const {
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
  } = req.body;
  try {
    const user = await patchUser(
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
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//-------------
router.get("/employees", async (req, res) => {
  try {
    const data = await getAllUsers();

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//OK----------------FIND BY ID--------------------------------------
router.get("/:id", async (req, res, next) => {
  try {
    const user = await userId(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});
//----------------

module.exports = router;
