const AdminModel = require("./admin.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const config = require("config");
const { has } = require("config");

const checkAuth = async (payload) => {
  let user = await AdminModel.findOne({ email: payload.email }).exec();

  if (!user) {
    return Promise.resolve({
      message: "Email or Password is incorrect. Please try again",
    });
  }
  let chkPass = await bcrypt.compare(payload.password, user.password);
  if (chkPass) {
    return user;
  }
  return Promise.resolve({
    message: "Email or Password is incorrect. Please try again",
  });
};

const createAdmin = async (payload) => {
  let email = await AdminModel.findOne({ email: payload.email }).exec();
  if (email) {
    return Promise.resolve({ message: "User Already Exists" });
  }
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(payload.password, salt);
  payload.password = hash;
  let data = await AdminModel.create(payload);
  return data;
};

const changePassword = async (payload) => {
  let email = await AdminModel.find({}).exec();

  let chkPass = await bcrypt.compare(payload.current_pass, email[0].password);

  if (chkPass) {
    //update password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(payload.new_pass, salt);

    await AdminModel.findOneAndUpdate(
      { email: email[0].email },
      { password: hash }
    );
    return Promise.resolve({
      message: "Password has been changed. You will be redirected to Login",
      code: 200,
    });
  } else {
    return Promise.resolve({
      message: "Please enter a correct new password.",
      code: 403,
    });
  }
};

module.exports = { checkAuth, createAdmin, changePassword };
