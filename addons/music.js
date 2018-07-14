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

bot.on("ready", () => {
  bot.guilds.first().defaultChannel.send("Online") 
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

ipc.of["FB"].on("music.play", l => {
	voiceChannel.join("466428868295655438")
		.then(connection => {
			youTube.search(l, 10, function (error, result) {
         	 if (result) {
           	 var video = result
          	  if (video.items[0]) {
        	      var stream = ytdl(`https://www.youtube.com/watch?v=${video}`, {filter: "audioonly"})
       	       var dispatcher = connection.playStream(stream, streamOptions)	
          	  }
         	   else message.channel.send("ERROR: Nothing was found...")
        	    }
        	  else {
           	 message.channel.send(error)
          	}
			})
		})
})

ipc.of["FB"].on("music.stop", s =>{
	voiceChannel.disconnect()
})
	
	
