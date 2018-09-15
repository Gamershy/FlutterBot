const {Schema} = require("mongoose");
var ItemSchema = new Schema({
  name:       String,
  value:      Number,
  quest:      Boolean,
  tradable:   Boolean
});

module.exports = ItemSchema;
