const { Router } = require("express");

const userRoutes = require("./userRoutes");
const router = Router();


router.get("/", (req, res) => {
  res.send("GET alone");
});

router.use("/user", userRoutes);

module.exports = router;
