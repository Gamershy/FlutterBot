const {Schema} = require("Mongoose")
var ItemSchema = new Schema({
  name:       String,
  value:      Number,
  quest:      Boolean,
  tradable:   Boolean
})

module.exports = ItemSchema
