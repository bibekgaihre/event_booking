const router = require("express").Router();

const apiRouter = require("./api.routes");
const uiRouter = require("./ui.routes");

/* GET home page. */

router.use("/", uiRouter);
router.use("/api/v1", apiRouter);

module.exports = router;
