require("express-async-errors");
const express = require("express");

const app = express();

const dbConnection = require("./startup/database");
const { getBooks } = require("./controllers/bookController");
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
const nodeEnv = app.get("env") === "development";
dbConnection.sync({ force: nodeEnv }).then(async () => {
  // Populate the Database
  await getBooks();

  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
