const {Schema} = require("Mongoose")

var WarnSchema = new Schema({
  issuer:   {type: String, required: true},
  reason:   {type: String, required: true},
  date:     {type: Date, default: Date.now()}

})
