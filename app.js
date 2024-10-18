// app.js
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const routes = require("./router/routes.js");
const error = require("./middlewares/error.middleware.js");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = "http://localhost:5173";
app.use(cors({ origin: allowedOrigins }));
// Use routes
app.use("/api", routes);


app.get('/users', (req, res) => {
    res.json([{ name: "John Doe" }]);
});


app.use(error);

module.exports = app;