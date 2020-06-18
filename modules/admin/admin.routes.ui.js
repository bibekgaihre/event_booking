const router = require("express").Router();

router.get("/login", function (req, res, next) {
  res.render("admin/login", { title: "Login" });
});
router.get("/event/add", function (req, res, next) {
  res.render("admin/addevent");
});
router.get("/event/list", function (req, res, next) {
  res.render("admin/listevent");
});
router.get("/content/update", function (req, res, next) {
  res.render("admin/editcms");
});
module.exports = router;
