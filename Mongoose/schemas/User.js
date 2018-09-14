const {Schema} = require("mongoose");
const ItemSchema = require("./Item");

var UserSchema = new Schema({
  userId:       {type:String, index: true},
  exp:          {type:Number, default:0},
  lvl:          {type:Number, default:1},
  nxtlvl:       {type:Number, default: 100},
  gem:          {type:Number, default:100},
  inv:          [ItemSchema],
  lastReward:   {type:Date, default:new Date()},
  rewardChain:  {type:Number, default:0}
});

UserSchema.methods.warn = require("../methods/instance/User/warn.js");

module.exports = UserSchema;
