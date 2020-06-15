const BookingModel = require("../booking/booking.model");

class Controller {
  constructor() {}

  //add  user detail in booking and genrate the a token for them and store in database
  //add only for work email
  //also send the email logic here
  saveBooking() {
    //todo keep this email validator as middleware
    let invalidEmails = [
      "@gmail.com",
      "@hotmail.com",
      "@yahoo.com",
      "@outlook.com",
      "@msn.com",
    ];
    if (invalidEmails.some((v) => str.includes(v))) {
      // There's at least one
    }
  }

  //add booking to event only if verfied
  //check token here for same user
  //if token matches isconfirmed to true, delete the token and update the bookingid on event schema
  verifyBooking() {}
}
module.exports = new Controller();
