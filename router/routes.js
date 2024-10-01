const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route.js");
const shopifyRoutes = require("./shopify.route.js");
const finixRoutes = require("./finix.route.js");

router.use("/users", userRoutes);

module.exports = router;
