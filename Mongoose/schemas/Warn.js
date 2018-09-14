const {Schema} = require("mongoose");

var WarnSchema = new Schema({
  user:     {type: Schema.Types.ObjectId, ref: "User", required: true},
  issuer:   {type: Schema.Types.ObjectId, ref: "User", required: true},
  reason:   {type: String, required: true},
  active:   {type: Boolean, default: true},
  date:     {type: Date, default: Date.now}
});

WarnSchema.statics.forUser = require("../methods/static/Warn/forUser");

module.exports = WarnSchema;
