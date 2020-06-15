const router = require("express").Router();

const apiRouter = require("./api.routes");
// const uiRouter = require("./ui.routes");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// router.use("/", uiRouter);
router.use("/api/v1", apiRouter);

module.exports = router;
