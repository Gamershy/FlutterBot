//packages
const fs = require("fs");
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const path = require("path");
const modelsDirectory = path.join(__dirname, "models");
const config = require("../config.js");

//connection
global.db = mongoose.createConnection(config.dbip)

//code
fs.readdirSync(modelsDirectory).forEach(file => {
  if (file.endsWith(".js"))
require(path.join(modelsDirectory, file));
});

module.exports = mongoose;
