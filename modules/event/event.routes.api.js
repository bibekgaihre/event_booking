const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = require("express").Router();
const Controller = require("./event.controller.js");
const SecureAPI = require("../../utils/secureAPI");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/events");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + new Date().getTime() + ".jpg");
  },
});

var upload = multer({ storage: storage }).any();

router.get("/", SecureAPI(), async (req, res, next) => {
  //to do filter query params

  let limit = parseInt(req.query.limit) || 27;
  let start = parseInt(req.query.start) || 0;
  let page = parseInt(start) / parseInt(limit) + 1;
  let data = await Controller.list({ limit, start, page });

  try {
    res.json(data);
  } catch (e) {
    console.log(e);
  }
});

router.get("/getlatestevent", async (req, res, next) => {
  try {
    let data = await Controller.getlatestevent();

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});
router.get("/download/:id", SecureAPI(), async (req, res, next) => {
  let data = await Controller.generateCSV(req.params.id);
  data = Buffer.from(data);
  // res.send(data);
  res.setHeader("Content-disposition", "attachment; filename=testing.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(data);
});
router.get("/:id", async (req, res, next) => {
  let data = await Controller.getById(req.params.id);
  res.json(data);
});

router.post("/", upload, async (req, res, next) => {
  let data = await Controller.save(req.body, req.files);
  res.redirect("/admin/event/list");
});

router.patch("/:id", upload, async (req, res, next) => {
  let data = await Controller.updateById(req.params.id, req.body, req.files);
  res.json(data);
});

router.delete("/:id", SecureAPI(), async (req, res, next) => {
  let data = await Controller.removeById(req.params.id);
  res.json(data);
});

module.exports = router;
