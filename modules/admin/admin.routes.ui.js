const router = require("express").Router();
const SecureUI = require("../../utils/secureUI");

router.get("/login", function (req, res, next) {
  res.render("admin/login", { title: "Login" });
});
router.get("/event/add", SecureUI(), function (req, res, next) {
  res.render("admin/addevent");
});
router.get("/event/list", SecureUI(), function (req, res, next) {
  res.render("admin/listevent");
});
router.get("/event/:id", SecureUI(), (req, res, next) => {
  res.render("admin/editevent", { id: req.params.id });
});

router.get("/content/update", SecureUI(), function (req, res, next) {
  res.render("admin/editcms");
});
router.get("/event/update", SecureUI(), function (req, res, next) {
  res.render("admin/editevent");
});
module.exports = router;
