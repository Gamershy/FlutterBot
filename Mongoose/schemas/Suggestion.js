const {Schema} = require("mongoose");

module.exports = new Schema({
  user_id: {type:String, required:true},
  suggestion_id: {type:Number, required:true},
  
  suggestion_content: {type:[String], required:true}
});
