const User = db.model("User");

function callback(err, document) {
  if (err) {throw err; return}
  
  // Sorry Shy, but it runs quicker.
  switch(true) {
    case (document.lvl == 5):
      this.member.addRole("403125967939436545").then(() => {
        this.author.send("You've ranked up to `NewCummer`!");
      });
      break;
    case (document.lvl == 10):
      this.member.addRole("403126021500567552").then(() => {
        this.author.send(["You've ranked up to `Daily Fapper`!", "You can now use the `/color` command."]);
      });
      break;
    case (document.lvl == 30):
      this.member.addRole("403126248487780372").then(() => {
        this.author.send("You've ranked up to `Addicted to Porn`!");
      });
      break;
    case (document.lvl == 60):
      this.member.addRole("403126385981521941").then(() => {
        this.author.send("You've ranked up to `Pervert`!");
      });
      break;
    case (document.lvl == 100):
      this.member.addRole("403126466210037771").then(() => {
        this.author.send("Holy shit, you've become a `God of Lewdness`.. This is the highest possible rank you can get!");
      });
      break;
  }

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
