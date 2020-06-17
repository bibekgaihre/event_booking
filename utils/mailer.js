const nodemailer = require("nodemailer");
const config = require("config");
const { InsufficientStorage } = require("http-errors");

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
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.get("mail.username"), //change username and password per each client
        pass: config.get("mail.password"),
      },
      //if using auth token
      // auth: {
      //   user: config.get("mail.username"), //change username and password per each client
      //   type: 'OAuth2',
      //   accessToken: config.get("mail.token");
      // },
    });

    let info = await transporter.sendMail({
      from: '"GiveAway   <giveaway@onpulze.com>" ', // sender address
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

    return info;
  }
  async sendContactEmail(fields) {
    console.log(fields);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.get("mail.username"), //change username and password per each client
        pass: config.get("mail.password"),
      },
      //if using auth token
      // auth: {
      //   user: config.get("mail.username"), //change username and password per each client
      //   type: 'OAuth2',
      //   accessToken: config.get("mail.token");
      // },
    });
    try {
      let info = await transporter.sendMail({
        from: '"GiveAway   <giveaway@onpulze.com>" ', // sender address
        to: "foodsponsor@onpulze.com", // list of receivers
        subject: "Sponsor mail", // Subject line
        text: "A sponsor is sending the detail.", // plain text body
        html: `Name: ${fields.name}<br/>Mobile Phone Number: ${fields.mobile_number}<br/>Date to Sponsor: ${fields.date_to_sponsor}<br/>Number of meals:${fields.number_of_meals}`,
      });
      if (info.messageId) {
        return Promise.resolve({ message: "Email sent" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Mailer();
