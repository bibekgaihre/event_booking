const router = require("express").Router();

router.get("/:id", (req, res, next) => {
  res.render("admin/editevent", { id: req.params.id });
});

module.exports = router;
