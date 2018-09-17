const User = db.model("User");

function callback(document) {
  if (!document) return;

  // Sorry Shy, but it runs quicker.
  switch(true) {
    case (document.lvl == 5):
      if (!this.member.roles.has("403125967939436545")) this.member.addRole("403125967939436545").then(() => {
        if (!this.author.bot) this.author.send("You've ranked up to `NewCummer`!");
      });
      break;
    case (document.lvl == 10):
      if (!this.member.roles.has("403126021500567552")) this.member.addRole("403126021500567552").then(() => {
        if (!this.author.bot) this.author.send(["You've ranked up to `Daily Fapper`!", "You can now use the `/color` command."]);
      });
      break;
    case (document.lvl == 30):
      if (!this.member.roles.has("403126248487780372")) this.member.addRole("403126248487780372").then(() => {
        if (!this.author.bot) this.author.send("You've ranked up to `Addicted to Porn`!");
      });
      break;
    case (document.lvl == 60):
      if (!this.member.roles.has("403126385981521941")) this.member.addRole("403126385981521941").then(() => {
        if (!this.author.bot) this.author.send("You've ranked up to `Pervert`!");
      });
      break;
    case (document.lvl == 100):
      if (!this.member.roles.has("403126466210037771")) this.member.addRole("403126466210037771").then(() => {
        if (!this.author.bot) this.author.send("Holy shit, you've become a `God of Lewdness`.. This is the highest possible rank you can get!");
      });
      break;
  }

  if (document.exp > document.nxtlvl) {
    return User.findOneAndUpdate({ userId:this.author.id },
                                 { $inc: { lvl:1, nxtlvl:(document.lvl * 100 * 1.3) } },
                                 { "upsert":true, "setDefaultsOnInsert":true, "new":true }, ...bind(this));
  }
}

function error(err) {
  console.error(err);
  this.guild.defaultChannel.send(`${this.guild.owner} <@204316640735789056> There was a problem when assigning experience to a user.`
    + " This error has been logged to STDERR, and written to `~gamershy/bot/err.txt`.");
}

function bind(message) {
  return [callback.bind(message), error.bind(message)];
}

module.exports = bind;
