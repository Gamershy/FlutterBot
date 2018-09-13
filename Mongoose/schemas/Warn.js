const {Schema} = require("mongoose");

var WarnSchema = new Schema({
  issuer:   {type: String, required: true},
  reason:   {type: String, required: true},
  date:     {type: Date, default: Date.now()}

});

module.exports = WarnSchema;
