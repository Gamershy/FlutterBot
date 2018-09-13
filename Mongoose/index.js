//packages
const fawn = require("fawn");
const fs = require("fs");
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const path = require("path");
const modelsDirectory = path.join(__dirname, "models");
const config = require("../config.js");

//connection
mongoose.connect(config.dbip);
fawn.init(mongoose);

global.db = mongoose.connection;
global.Fawn = fawn;

//code
fs.readdirSync(modelsDirectory).forEach(file => {
  if (file.endsWith(".js")) require(path.join(modelsDirectory, file));
});

module.exports = mongoose;
