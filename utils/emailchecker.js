const checkEmail = () => {
  return function (req, res, next) {
    try {
      let work_email = req.body.work_email;
      let invalidEmails = [
        "@hotmail.com",
        "@yahoo.com",
        "@msn.com",
        "@outlook.com",
        "@icloud.com",
        "@aol.com",
      ];
      if (invalidEmails.some((v) => work_email.includes(v))) {
        return res.json({
          message: "Personal Email not allowed. Only work email are allowed",
        });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid " });
    }
  };
};

module.exports = checkEmail;
