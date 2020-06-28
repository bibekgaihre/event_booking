const router = require("express").Router();
const EventController = require("../event/event.controller");
const BookingController = require("../booking/booking.controller");

router.get("/", async (req, res, next) => {
  res.render("main");
});

router.get("/confirm/:eventid/:bookingid", async (req, res, next) => {
  let event = await EventController.getById(req.params.eventid);
  let booking = await BookingController.getBookingbyId(req.params.bookingid);

  res.render("confirmation", {
    full_name: booking.full_name,
    date: event.date,
  });
});

module.exports = router;
