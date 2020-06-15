const BookingModel = require("../booking/booking.model");
const EventModel = require("../event/event.model");
const mailer = require("../../utils/mailer");

class Controller {
  constructor() {}

  //add  user detail in booking and genrate the a token for them and store in database
  //add only for work email and send verification email
  async saveBooking(id, payload) {
    let event = await EventModel.findOne({ _id: id })
      .populate("booking")
      .exec();
    let emailfound = event.booking.filter((element) => {
      return element.work_email === payload.work_email;
    });
    if (emailfound.length === 1) {
      return Promise.resolve({
        message: "Email not allowed. Already exist for event",
      });
    }
    if (emailfound.length === 0) {
      if (event.max_booking === event.booking.length) {
        return Promise.resolve({ message: "Max booking reached." });
      } else {
        let token = this.generateToken(128);
        payload.token = token;

        let query = { time: event.date.getTime(), location: event.location };
        await BookingModel.create(payload);
        await mailer.sendVerificationEmail(payload, query);
        return Promise.resolve({ message: "Verification email sent." });
      }
    }
  }

  //check token here for same user
  //if token matches isconfirmed to true, delete the token and update the bookingid on event schema
  async verifyBooking(query, token) {
    let data = await BookingModel.findOneAndUpdate(
      { token: token },
      { is_confirmed: true }
    );

    let time = new Date(+query.time);
    if (data) {
      await EventModel.findOneAndUpdate(
        { location: query.location, date: time },
        { $push: { booking: data._id } }
      );

      let f = await BookingModel.findOneAndUpdate(
        { token: token },
        { token: null }
      );
      return Promise.resolve({ message: "Booking completed." });
    }
  }

  generateToken(n) {
    var chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var token = "";
    for (var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }
}
module.exports = new Controller();
