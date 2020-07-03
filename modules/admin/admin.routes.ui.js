const router = require("express").Router();
const SecureUI = require("../../utils/secureUI");
const adminModel = require("./admin.model");
const config = require("config");
const generalModel = require("../general/general.model");

router.get("/", function (req, res, next) {
  res.redirect("/admin/login");
});
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
router.get("/changepassword", SecureUI(), async (req, res, next) => {
  res.render("admin/changepassword");
});

router.get("/content/update", SecureUI(), async function (req, res, next) {
  let detail = await generalModel.findOne({});
  let otext, img, appstore_link, playstore_link;
  if (detail !== null) {
    otext = detail.overlay_text;
    img = detail.img;
    appstore_link = detail.app_store_link;
    playstore_link = detail.play_store_link;
  }
  res.render("admin/editcms", {
    text: otext,
    image: img,
    appstore: appstore_link,
    playstore: playstore_link,
  });
});
router.get("/event/update", SecureUI(), function (req, res, next) {
  res.render("admin/editevent");
});
module.exports = router;
