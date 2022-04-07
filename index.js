const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const dbConnection = require("./startup/database");
require("./models");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

const port = process.env.PORT || 3000;
const nodeEnv = app.get("env") === "development";

dbConnection.sync({ force: nodeEnv }).then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
