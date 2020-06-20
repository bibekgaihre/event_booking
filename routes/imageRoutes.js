const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const GeneralModel = require("../modules/general/general.model");
const { ConnectionBase } = require("mongoose");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/eventImage");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + ".jpg");
  },
});
var upload = multer({ storage: storage });

// router.get("/", async (req, res, next) => {
//   GeneralModel.findOne({}, (err, response) => {
//     let data = Buffer.from(response.img.data.buffer);
//     res.contentType("image/jpeg");
//     res.send(data.toString("base64"));
//   });
// });

router.post("/upload", upload.single("myFile"), async (req, res, next) => {
  try {
    let newFile = req.file.path.replace(/^.*[\\\/]/, "");
    // var encode_image = fs.readFileSync(req.file.path).toString("base64");
    let directory = path.join(__dirname + "/../public/images/eventImage");
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        if (file !== newFile)
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
      }
    });
    /**saving to db as image buffer!! */
    // var img = {
    //   data: Buffer.from(encode_image, "base64"),
    //   contentType: req.file.mimetype,
    // };
    // let image = await GeneralModel.find({});
    // if (!image.length) await GeneralModel.create({ img });
    // else await GeneralModel.updateOne({ _id: image._id }, { img });
    res.send(req.file);
  } catch (e) {
    console.log(e);
    const error = new Error("Error Uploading the Image");
    error.httpStatusCode = 400;
    return next(error);
  }
});

module.exports = router;
