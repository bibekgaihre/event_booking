const router = require("express").Router();
const Controller = require("./event.controller.js");

router.get("/", async (req, res, next) => {
  //filter query params
  let data = await Controller.list();
  res.json(data);
});

router.get("/download/:id", async (req, res, next) => {
  let filename = "export.csv";
  let data = await Controller.download(req.params.id);
  // res.setHeader("Content-Type", "text/csv");
  // res.setHeader("Content-Disposition", "attachment; filename=" + filename);
  // res.csv(data, true);
  // res.download(data);
  res.json(data);
});

router.get("/:id", async (req, res, next) => {
  let data = await Controller.getById(req.params.id);
  res.json(data);
});

router.post("/", async (req, res, next) => {
  let data = await Controller.save(req.body);
  res.json(data);
});

router.patch("/:id", async (req, res, next) => {
  let data = await Controller.updateById(req.params.id, req.body);
  res.json(data);
});

router.delete("/:id", async (req, res, next) => {
  let data = await Controller.removeById(req.params.id);
  res.json(data);
});

module.exports = router;
