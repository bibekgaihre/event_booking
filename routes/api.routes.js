const router = require("express").Router();
const bookingRouter = require("../modules/booking/booking.routes.api");
const eventRouter = require("../modules/event/event.routes.api");
const generalRouter = require("../modules/general/general.routes.api");
const adminRouter = require("../modules/admin/admin.routes.api");

router.use("/admin", adminRouter);
router.use("/general", generalRouter);
router.use("/event", eventRouter);
router.use("/booking", bookingRouter);

module.exports = router;
