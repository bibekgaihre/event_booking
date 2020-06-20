const router = require("express").Router();

const fileUploadRouter = require("./imageRoutes");
const apiRouter = require("./api.routes");
const uiRouter = require("./ui.routes");
// const { route } = require("../modules/admin/admin.routes.ui");

router.use("/file", fileUploadRouter);
router.use("/", uiRouter);
router.use("/api/v1", apiRouter);

module.exports = router;
