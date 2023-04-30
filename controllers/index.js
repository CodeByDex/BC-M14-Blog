const router = require("express").Router();
const apiRoutes = require("./api");
const navRoutes = require("./NavigationRoutes");

router.use("/api", apiRoutes);
router.use("/", navRoutes);

module.exports = router;