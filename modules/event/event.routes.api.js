const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = require("express").Router();
const Controller = require("./event.controller.js");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/events");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + new Date().getTime() + ".jpg");
  },
});

var upload = multer({ storage: storage }).any();

router.get("/:id", async (req, res, next) => {
  let data = await Controller.getById(req.params.id);
  res.json(data);
});

router.get("/", async (req, res, next) => {
  //to do filter query params
  let data = await Controller.list();
  res.json(data);
});

router.get("/download/:id", async (req, res, next) => {
  let data = await Controller.generateCSV(req.params.id);
  data = Buffer.from(data);
  // res.send(data);
  res.setHeader("Content-disposition", "attachment; filename=testing.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(data);
});

router.post("/", upload, async (req, res, next) => {
  let data = await Controller.save(req.body, req.files);
  res.json(data);
});

router.patch("/:id", upload, async (req, res, next) => {
  let data = await Controller.updateById(req.params.id, req.body, req.files);
  res.json(data);
});

router.delete("/:id", async (req, res, next) => {
  let data = await Controller.removeById(req.params.id);
  res.json(data);
});

module.exports = router;
