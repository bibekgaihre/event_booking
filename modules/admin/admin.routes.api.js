const router = require("express").Router();
const config = require("config");
const AdminController = require("./admin.controller");
const jwt = require("jsonwebtoken");

const SecureAPI = require("../../utils/secureAPI");

router.post("/login", async (req, res, next) => {
  let payload = req.body;
  try {
    let data = await AdminController.checkAuth(payload);
    if (data.email) {
      const token = await jwt.sign(
        {
          email: data.email,
          userId: data._id,
        },
        config.get("app.secret"),
        {
          expiresIn: "48h",
        }
      );
      res
        .cookie("token", token)
        .status(200)
        .json({ message: "Login Successfull", token: token });
    } else if (!data.email) {
      res.status(401).json(data);
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/changepassword", SecureAPI(), async (req, res, next) => {
  try {
    let payload = req.body;
    let data = await AdminController.changePassword(payload);
    res.json(data);
  } catch (error) {
    return error;
  }
});
router.post("/", async (req, res, next) => {
  let payload = req.body;
  const data = await AdminController.createAdmin(payload);
  try {
    res.json(data);
  } catch (e) {
    return e;
  }
});

module.exports = router;
