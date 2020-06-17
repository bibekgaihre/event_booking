const router = require("express").Router();

router.get("/login", function (req, res, next) {
  res.render("admin/login", { title: "Login" });
});
router.get("/event/add", function (req, res, next) {
  res.render("admin/addevent");
});
module.exports = router;
