const router = require("express").Router();

router.get("/:id", async (req, res, next) => {
  let eventid = req.params.id;
  res.render("register", { eventid });
});

module.exports = router;
