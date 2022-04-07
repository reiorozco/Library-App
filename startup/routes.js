const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");

const bookRoutes = require("../routes/bookRoutes");
const userRoutes = require("../routes/userRoutes");
const lendRoutes = require("../routes/lendRoutes");
const returnRoutes = require("../routes/returnRoutes");

const errorHandler = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
  }

  // Routes
  app.use("/api/books", bookRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/lends", lendRoutes);
  app.use("/api/returns", returnRoutes);

  // Error Handler
  app.use(errorHandler);
};
