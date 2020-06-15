const router = require("express").Router();
const Controller = require("./booking.controller");
const emailCheck = require("../../utils/emailchecker");

router.get("/", async (req, res, next) => {});

router.get("/verify/:token", async (req, res, next) => {
  try {
    let query = { time: req.query.time, location: req.query.location };
    let token = req.params.token;
    let data = await Controller.verifyBooking(query, token);

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id", emailCheck(), async (req, res, next) => {
  try {
    let data = await Controller.saveBooking(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
