const mongoose = require("mongoose");
const { MONGO_URL } = require("./config.js");

if (MONGO_URL) {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);

  mongoose.connect(MONGO_URL);
} else {
  console.log("ERROR CONNEXION");
}
mongoose.Promise = global.Promise; // Get Mongoose to use the global promise library
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("\x1b[1m%s\x1b[0m", "database connected"); /*yellow*/
  // db.collections.places.dropIndexes(async function () {
  //     await db.collections.actions.createIndex({
  //       status: 1,
  //       dueAt: -1,
  //     });
  //   await db.collections.places.createIndex({
  //     createdAt: 1,
  //   });
  //   await db.collections.places.reIndex(async () => {
  //     console.log(await db.collections.places.getIndexes());
  //   });
  // });
});

module.exports = db;
