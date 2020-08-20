const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logger = require("morgan");
const errors = require("./errors");

require("dotenv").config();

const { PORT, MONGO_URL } = require("./config.js");

require("./mongo");

// Put together a schema
const app = express();
app.use(logger("dev"));

// Pre middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet());
app.use(cors());

const now = new Date().toISOString();

// Routes
if (MONGO_URL) {
  app.use("/viennoiseries", require("./controllers/viennoiserie"));
}

app.get("/", async (req, res) => {
  res.send(`Hello World on port ${PORT} at ${now}`);
});

// (async () => {
//   const personsObject = require("./models/person");
//   const persons = await personsObject.find({});
//   console.log("persons", persons);
// })();

// app.use(errors.notFound);
app.use(errors.sendError);

// Start the server
app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));
