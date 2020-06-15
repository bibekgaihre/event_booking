const nodemailer = require("nodemailer");
const config = require("config");

class Mailer {
  async sendVerificationEmail(payload, query) {
    let link =
      config.get("app.url") +
      "/api/v1/booking/verify/" +
      payload.token +
      "/" +
      "?time=" +
      query.time +
      "&location=" +
      query.location;
    console.log(link);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.get("mail.username"), //change username and password per each client
        pass: config.get("mail.password"),
      },
    });

    let info = await transporter.sendMail({
      from: '"GiveAway   <giveaway@example.com>" ', // sender address
      to: payload.work_email, // list of receivers
      subject: "Email Verification", // Subject line
      text: "A Booking for your account was requested", // plain text body
      html:
        "Please click the button below to Verify your event booking.<br><a href=" +
        link +
        ">" +
        "<h2>Verify Your Event Booking</h2>" +
        "</a>", // html body
    });
    console.log(info);
    return info;
  }
}

module.exports = new Mailer();
