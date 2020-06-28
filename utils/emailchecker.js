const checkEmail = () => {
  return function (req, res, next) {
    try {
      let work_email = req.body.work_email;
      let invalidEmails = [
        "@hotmail.com",
        "@yahoo.com",
        "@msn.com",
        "@icloud.com",
        "@outlook.com",
        "@aol.com",
        "@gmail.com",
      ];
      if (invalidEmails.some((v) => work_email.includes(v))) {
        return res.json({
          message:
            "You cannot use your personal email to book a meal. Please register with your work email",
        });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid " });
    }
  };
};

module.exports = checkEmail;
