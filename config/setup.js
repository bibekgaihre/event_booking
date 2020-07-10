
const { createAdmin } = require("../modules/admin/admin.controller");
const mongoose = require("mongoose");
const config = require("config");
let mongo = require("./local.json")
mongoose.connect(process.env.MONGO_URL || mongo.db.url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const register = async () => {
  let admin = {
    name: "test",
    password: "test",
    roles: ["admin"],
    email: "test@test.com",
  };
  try {
    let data = await createAdmin(admin);
    if (data) {
      console.log("admin created");
      process.exit();
    }
  } catch (e) {
    console.log(e);
  }
};

register();