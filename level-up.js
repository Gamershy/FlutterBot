const User = db.model("User");

async function callback(document) {
  if (!document) {
    // TODO: protect against infinite loops
    return User.findOne({userId:this.author.id})
      .then(user => callback.call(this, user))
      .catch(err => error.call(this, err));
  }

  if (document.exp > document.nxtlvl) {
    return User.findOneAndUpdate({ userId:this.author.id },
                                 { $inc: { lvl:1, nxtlvl:(document.lvl * 100 * 1.3) } },
                                 { "upsert":true, "setDefaultsOnInsert":true, "new":true }, ...bind(this));
  }

  let messages = [];

  // Sorry Shy, but it runs quicker.
  switch(true) {
    case (document.lvl >= 100):
      if (!this.member.roles.has("403126466210037771")) {
        this.member.addRole("403126466210037771");
        messages.push("Holy shit, you've become a `God of Lewdness`.. This is the highest possible rank you can get!");
      }
    case (document.lvl >= 60):
      if (!this.member.roles.has("403126385981521941")) {
        await this.member.addRole("403126385981521941");
        messages.push("You've ranked up to `Pervert`!");
      }
    case (document.lvl >= 30):
      if (!this.member.roles.has("403126248487780372")) {
        await this.member.addRole("403126248487780372");
        if (!this.author.bot) messages.push("You've ranked up to `Addicted to Porn`!");
      }
    case (document.lvl >= 10):
      if (!this.member.roles.has("403126021500567552")) {
        await this.member.addRole("403126021500567552");
        if (!this.author.bot) messages.push(["You've ranked up to `Daily Fapper`!", "You can now use the `/color` command."]);
      }
    case (document.lvl >= 5):
      if (!this.member.roles.has("403125967939436545")) {
        await this.member.addRole("403125967939436545");
        if (!this.author.bot) messages.push("You've ranked up to `NewCummer`!");
      }
      break;
  }

  if (messages.length && !this.author.bot) {
    messages = messages
      .filter(message => Boolean(message))
      .reverse()
      .map(message => this.author.send(message));
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
