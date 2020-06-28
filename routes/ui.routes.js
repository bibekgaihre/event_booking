const router = require("express").Router();
// const bookingRouter = require("../modules/booking/booking.routes.ui");
const eventRouter = require("../modules/event/event.routes.ui");
const generalRouter = require("../modules/general/general.routes.ui");
const adminRouter = require("../modules/admin/admin.routes.ui");
const eventRouter = require("../modules/event/event.routes.ui");

// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.use("/admin", adminRouter);

router.use("/event", eventRouter);
// router.use("/", generalRouter);
// router.use("/event", eventRouter);

router.get("/register", async (req, res, next) => {
  res.render("register");
});
router.get("/logout", async (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/admin/login");
});

router.use("/", generalRouter);
router.use("/event", eventRouter);

// router.use("/booking", bookingRouter);

module.exports = router;
