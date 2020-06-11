const router = require("express").Router();
const bookingRouter = require("../modules/booking/booking.routes.ui");
const eventRouter = require("../modules/event/event.routes.ui");
const generalRouter = require("../modules/general/general.routes.ui");
const adminRouter = require("../modules/admin/admin.routes.ui");

router.use("/admin", adminRouter);
router.use("/", generalRouter);
// router.use("/event", eventRouter);
// router.use("/booking", bookingRouter);

module.exports = router;
