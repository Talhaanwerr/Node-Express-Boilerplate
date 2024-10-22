require("express-async-errors");
const express = require("express");
const cors = require("cors");
const routes = require("./router/routes.js");
const errorMiddleware = require("./middlewares/error.middleware.js");

const app = express();

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = "http://localhost:5173";
app.use(cors({ origin: allowedOrigins }));
// Use routes
app.use("/api", routes);

// Sample route for testing
app.get('/users', (req, res) => {
    res.json([{ name: "John Doe" }]);
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;