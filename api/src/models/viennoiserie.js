const mongoose = require("mongoose");

const MODELNAME = "Viennoiserie";

const Schema = new mongoose.Schema({
  name: String,
  comment: String,
  email: String,
  zip: String,
  quizz: String,
});

module.exports = mongoose.model(MODELNAME, Schema);
