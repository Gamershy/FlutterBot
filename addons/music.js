const ipc = require("node-ipc")
const Discord = require("discord.js")
const config = require("./musiccfg.js")
const {devmode} = require("../config.js");

if (!Discord.Guild.prototype.hasOwnProperty("defaultChannel")) {
  Object.defineProperty(Discord.Guild.prototype, "defaultChannel", {
    get: function () {
      delete this.defaultChannel;
      return this.defaultChannel = this.channels.get("249311166776606721");
    }
  });
}

const music = require("opusscript")
const yt = require("youtube-node")
const bot = new Discord.Client({fetchAllMembers: true, disabledEvents: ["TYPING_START"]})
const path = require("path")
const ytdl = require("ytdl-core")
const streamOptions = {seek: 0, volume: 1}
ipc.config.id = "FB"
ipc.config.socketRoot = path.join(__dirname, "..", "sockets")
ipc.config.socketRoot += "/"
ipc.config.networkPort = "8000"

var queue = []
var musicChannel
var debugChannel

function ErrorHandler(err) {
  let date = new Date();
  let dateFormatted = `${("0" + date.getDate()).slice(-2)}-${("0" + date.getMonth()).slice(-2)}-${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}h${("0" + date.getMinutes()).slice(-2)}m${("0" + date.getSeconds()).slice(-2)}s.${("0000" + date.getMilliseconds()).slice(-4)}ms`;
  let header = `${err.name} - ${dateFormatted}`;

  let shy = bot.fetchUser("104674953382612992");
  let wolf = bot.fetchUser("204316640735789056");

  // way too overcomplicated work-around for sending messagess
  Promise.all([shy, wolf]).then(users => {
    new Promise((resolve, reject) => {
      let _userId = 0;
      let send = function(user) {
        try {
          user.send({embed: {title: header, description: `\`\`\`xl\n${err.stack}\n\`\`\``}}).then(() => {
            _userId++;

            if (_userId === users.length) {
              resolve();
            } else {
              send(users[_userId]);
            }
          });
        } catch (e) {
          reject(e);
        }
      }

      send(users[_userId]);
    }).then(() => bot.destroy())
      .then(() => process.exit())
  }).catch(e => {
    console.log("Failed with", e.stack);
  });
};

process.on("uncaughtException", ErrorHandler);
bot.on("error", ErrorHandler); // perform same actions as unhandledRejection.


bot.on("ready", () => {
  bot.guilds.first().defaultChannel.send("Online")
  musicChannel = bot.guilds.first().channels.get("466428868295655438")
  debugChannel = bot.guilds.first().channels.get("249311166776606721")
})

if (devmode) {
  ipc.connectToNet("FB", 8000, function() {
    bot.login(config.token)
  })
} else {
  ipc.connectTo("FB", function() {
    bot.login(config.token);
  });
}

ipc.of["FB"].on("music.say", msg => {
  bot.guilds.first().defaultChannel.send(msg)
})

ipc.of["FB"].on("shutdown", m => {
        bot.destroy()
        .then(process.exit())
})

ipc.of["FB"].on("music.play", args => {
  console.log("Triggered: ipc:music.play")

  musicChannel.join().then(connection => {
    console.log("Searching for " + args.q + "...");
    yt.search(args.q, 11, function (error, result) {
      if (result) {
        var video = result
        if (video.items[0]) {
          var stream = ytdl(`https://www.youtube.com/watch?v=${video.items[0].id.videoId}`, {filter: "audioonly"})
          var dispatcher = connection.playStream(stream, streamOptions)
        }
        else debugChannel.send("ERROR: Nothing was found...")
      }
      else {
        debugChannel.send(error)
      }
    })
  })
})

ipc.of["FB"].on("music.stop", s =>{
        voiceChannel.disconnect()
})

exports.bot = bot;

