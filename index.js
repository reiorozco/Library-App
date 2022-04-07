const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const dbConnection = require("./startup/database");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const lendRoutes = require("./routes/lendRoutes");
const returnRoutes = require("./routes/returnRoutes");

const errorHandler = require("./middleware/error");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

//Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lends", lendRoutes);
app.use("/api/returns", returnRoutes);

// Error Handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
const nodeEnv = app.get("env") === "development";

dbConnection.sync({ force: nodeEnv }).then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
