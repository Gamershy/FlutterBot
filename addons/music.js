const ipc = require("node-ipc")
const Discord = require("discord.js")
const config = require("./musiccfg.js")
if (!Discord.Guild.prototype.hasOwnProperty("defaultChannel")) {
  Object.defineProperty(Discord.Guild.prototype, "defaultChannel", {
    get: function () {
      delete this.defaultChannel;
      return this.defaultChannel = this.channels.get("249311166776606721");
    }
  })
}
;
const music = require("opusscript")
const yt = require("youtube-node")
const bot = new Discord.Client({fetchAllMembers: true, disabledEvents: ["TYPING_START"]})
const path = require("path")
ipc.config.id = "FB"
ipc.config.socketRoot = path.join(__dirname, "..", "sockets")
ipc.config.socketRoot += "/"
ipc.config.networkPort = "8000"

var queue = []

bot.on("ready", () => {
	bot.guilds.first().defaultChannel.send("Online") 
})
ipc.connectToNet(8000, function() {
  bot.login(config.token)
})

ipc.of[8000].on("music.say", msg => {
	bot.guilds.first().defaultChannel.send(msg)
})

