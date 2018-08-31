//    TODO: re-implement
//    // overcomplicated rank adding code
//    if (__user.lvl >= 5){
//      if (!message.member.roles.has("403125967939436545")){
//        message.member.addRole("403125967939436545")
//	message.author.send("You've ranked up to `NewCummer`!")
//      }
//    }
//
//    if (__user.lvl >= 10){
//      if (!message.member.roles.has("403126021500567552")){
//        message.member.addRole("403126021500567552")
//	message.author.send("You've ranked up to `Daily Fapper`! \nYou can now use the command `/color`. ")
//      }
//    }
//
//    if (__user.lvl >= 30){
//      if (!message.member.roles.has("403126248487780372")){
//        message.member.addRole("403126248487780372")
//	message.author.send("You've ranked up to `Addicted to Porn`!")
//      }
//    }
//
//    if (__user.lvl >= 60){
//      if (!message.member.roles.has("403126385981521941")){
//        message.member.addRole("403126385981521941")
//	message.author.send("You've ranked up to `Pervert!`")
//      }
//    }
//
//    if (__user.lvl >= 100){
//      if (!message.member.roles.has("403126466210037771")){
//        message.member.addRole("403126466210037771")
//	message.author.send("Holy shit, you've become a `God of Lewdness`.. This is the highest possible rank you can get!")
//      }
//    }
//
//
//  __user.isModified()? __user.save() : void 0 ;

const User = db.model("User");

function callback(document) {
  if (document.exp > document.nxtlvl) {
    return User.findOneAndUpdate({ userId:this.author.id },
                                 { $inc: { lvl:1, nxtlvl:(document.lvl * 100 * 1.3) } },
                                 { "upsert":true, "setDefaultsOnInsert":true, "new":true }, bind(this));
  }


};

function bind(message) {
  return callback.bind(message);
}

module.exports = bind;
