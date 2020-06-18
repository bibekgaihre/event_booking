// const { NotExtended } = require("http-errors");

// const router = require("express").Router();
// const mailer = require("../../utils/mailer");
// const multer = require("multer");
// const Controller = require("./general.controller");

// let Upload = multer({
//   storage: memoryStorage,
//   fileFilter(req, file, next) {
//     next(null, true);
//   },
// }).single();

// router.post("/sendcontactemail", async (req, res, next) => {
//   try {
//     let fields = req.body;
//     let data = await mailer.sendContactEmail(fields);
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/changeImage", async (req, res, next) => {
//   Upload(req, res, async () => {
//     let data = await Controller.updateImage(req.files);
//     res.json(data);
//   });
// });

// router.post("/changeText", async (req, res, next) => {
//   if (!req.body.text) {
//     res.send({
//       success: false,
//       message: "No overlay text found. Send an overlay text.",
//     });
//   }
//   let data = await Controller.updateText(req.body.text);
//   res.json(data);
// });

// module.exports = router;
