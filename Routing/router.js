const express = require("express");
const router = express.Router();
const routeHandlers = require("./routeHandlers.js");

router.use("/", routeHandlers);

module.exports = router;