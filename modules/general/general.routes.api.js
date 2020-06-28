// const { NotExtended } = require("http-errors");

const router = require("express").Router();
const mailer = require("../../utils/mailer");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const Controller = require("./general.controller");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 4 },
  fileFilter: fileFilter,
});

router.post("/sendcontactemail", async (req, res, next) => {
  try {
    let fields = req.body;
    let data = await mailer.sendContactEmail(fields);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/changeimage", upload.single("image"), async (req, res, next) => {
  try {
    let data = await Controller.updateImage(req.file.path);
    res.json(data);
  } catch (e) {
    console.error(e);
  }
});

router.post("/changetext", async (req, res, next) => {
  try {
    let data = await Controller.updateText(req.body.text);
    if (data) {
      res.json(data);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
