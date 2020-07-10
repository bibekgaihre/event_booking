var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const config = require("config");

var indexRouter = require("./routes/index");
var app = express();
let mongo = require("./config/local.json")
mongoose.connect(process.env.MONGO_URL || mongo.db.url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("uploads"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.headers["content-type"] == "application/json") {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    res.status(404).render("misc/404", {
      title: "Not Found",
      status: 404,
      url: req.url,
    });
  }
});
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      success: false,
      error: err,
    });
  });
}
// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
