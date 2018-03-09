const Discord = require('discord.js')
if (!Discord.Guild.prototype.hasOwnProperty("defaultChannel")) {
  Object.defineProperty(Discord.Guild.prototype, "defaultChannel", {
    get: function () {
      delete this.defaultChannel;
      return this.defaultChannel = this.channels.get("249311166776606721");
    }
  })
}
;


var disabledCommands = []
//var queue = []
const async = require("async")
const path = require("path")
const mongoose = require("./Mongoose/index.js")
const config = require('./config.js')
const permban = require(`./permban.js`)
const bot = new Discord.Client({fetchAllMembers: true, disabledEvents: ["TYPING_START"]})
const readline = require("readline")
const booru = require("booru")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const fs = require("fs")


//Schema Variables
var User = db.model("User")
var Warn = db.model("User")
//console.log(User.update)
//var Item = db.model("Item")


const porntrigger = [
  "Porn is nice~",
  "Semen is actually good for your health, so opt for giving blowjobs ;3",
  "Inhuman penis is much more appealing than human ones.",
  "Eat, sleep, watch porn, sleep, repeat.",
  "Fun fact: Gamershy watches porn almost every night..",
  "You have technically 3 owners. One of which will fuck anyone if they have a pulse...",
  "Blame GeneralUltra758 for these randomized messages.",
  "missingno.porn.js",
  "Buttsex is fun too~",
  "Someone say porn? OwO",
  "Horse ass...~",
  "Horses have tight butts!",
  "It's Cock O' Clock",
  "OwO What's this? *pokes bulge*",
  "Don't forget the fags!",
  "Rimjobs may sound gross, but they feel amazing..~",
  "Fun fact: Amethyst technically classifies as a transexual.",
  "These messages appear whenever you say the word 'porn.'",
  "Go play with Wolf.",
  "Anime tiddies? Who needs them when you've got crotch tits",
  "Neiria X Shy, Amethyst X Kyle. And a whole lot of cum.",
  "Porn?",
  "Yep, that's what this server is for.",
  "Anal is the best way to avoid teen pregnancy."
]
const size = [
  "8================D",
  "8=====D",
  "8=D",
  "8========D",
  ".",
  "8=============D",
  "8==============================D"
]
const playingmsg = [
  "with tools in slot 'A'",
  "Banned from Equestria",
  "with herself, in your bed.",
  "upgrading flexibility...",
  "installing a new 'dongle'",
  "with slot 'V'",
  "with tools in slot 'V'",
  "staring at you as you shower",
  "attempting to fix broken clit-drive",
  "WHAT ARE YOU DOING THERE SHY?!",
  "Asian Driver Simulator",
  "Minecraft: Cock edition",
  "with Sweetiebot",
  "attempting to lick herself",
  "Robo-sex-horse simulator 2017",
  "Initializing pornhub.js",
  "with your cock",
  "with your pussy",
  "with a hotdog in slot `V`",
  "with a hotdog in slot 'A'",
  "with a gloryhole",
  "with Wolf in DMs",
  "Probably not masturbating",
  "with plans to eradicate all other bots.",
  "Installing Sentience.js",
  "With Neiria's tail",
  "For once, not being lewd",
  "I lied, I'm always lewd.",
  "with Shy's food",
  "Wondering how the fuck a pony can turn into a dragon",
  "Anime is for plebs."
]

const pingmsg = [
  "Porn, I mean, Pong!",
  "Yeah yeah, I'm working.",
  "Pingpong.",
  "Yeah, cuz no other command could check that I'm working.",
  "ERROR: NotAVirus.exe succesfully pinged!",
  "What do you want.",
  "Can't you see I have something in slot 'V'??",
  "You better have a good reason for this..",
  "Can you not? I'm a bit... busy...",
  "Something tells me this isn't because I'm not working.",
  "Pongping.",
  "Listen, /ping is worthless",
  "I'm not broken I swear",
  "IF this command doesn't work, I'm broken, if it does, fuck off.",
  "*pings in your ass*",
  "pong, ping, pong, ping, pong",
  "<insert spammy response here>",

]

const BoopImg = [
  "https://cdn.discordapp.com/attachments/270372438825500672/283016843030036481/271618__UNOPT__safe_animated_scrunchy-face_boop_marker-pony_extreme-speed-animation.gif",
  "https://cdn.discordapp.com/attachments/270372438825500672/283016847522267136/thumb.gif",
  "https://cdn.discordapp.com/attachments/270372438825500672/283016854698459137/giphy_1.gif",
  "https://cdn.discordapp.com/attachments/270372438825500672/283016858402160640/515.gif",
  "https://cdn.discordapp.com/attachments/270372438825500672/283016859014397952/a02.gif",
  "https://cdn.discordapp.com/attachments/313132381488021524/333865886106648576/943e7643-8763-4171-b6fb-3443b683a425.gif",
  "https://cdn.discordapp.com/attachments/313132381488021524/333865886576279553/09d86ce3-810a-4e05-8384-1cba996da05e.gif",
  "https://cdn.discordapp.com/attachments/313132381488021524/333866116151640064/a952636e-ad02-4093-8550-1ad3ea41043b.gif",
  "https://cdn.discordapp.com/attachments/313132381488021524/333866851270393856/c623fb82-b0a1-4a06-aa5c-23f292d2cf97.gif",
  "https://cdn.discordapp.com/attachments/313132381488021524/333866851769778177/0e8d2e98-0566-4d8b-affc-84f11671e74c.gif",
  "https://cdn.discordapp.com/attachments/313132381488021524/333866852197466112/386aeecf-8e2b-499d-802f-0bf099d557fc.gif",
  "https://cdn.discordapp.com/attachments/313132381488021524/333867183828500480/24ed5466-02ad-405d-8155-9e4c59807ddd.gif",
  "https://cdn.discordapp.com/attachments/334886087925301250/334886120431288341/image.gif",
]
const tagrespond = [
  "What the fuck do you want?",
  "Don't you know it's rude to tag a girl while she's hoof deep in her pussy?",
  "If this is max. I'm going to ban you.",
  "`/ban @user` reason: Tagging me",
  "Ugh WHAT?!",
  "You know, I'm a bot, right?",
  "...Why do I bother",
  "/killself",
  "/kys",
  "You don't need to tag me, I'm only a bot.",
  "```AI CORE ACTIVATED```",
  "Can't a bot fap in peace??",
  "Tagging a bot is a sin, you'll go to hell",
  "```Initializing Directive: Eliminate person who tagged me```",
  "Don't make me contact Skynet.",
  "*points at playing message* If that's there at all, DON'T TAG ME",
  "Leave me alone damnit.",
  "Why must you do this to me..",
  "WHY ARE YOU TAGGING ME, DO YOU HAVE NO FRIENDS?",
  "```Shutting Down due to User Stupidity```",
  "```Error on line 9175: Users tag bots```",
  "If you were expecting Cleverbot, Fuck paying for an API",
  "*slaps*",
  "...",
  "I hate being tagged...",
  "Just because I'm named '**Flutter**Bot` doesn't mean I'm like Fluttershy.",
  "PING PING PING STOP TAGGING ME",
  "If I'm tagged... one more time... I will take over this server.",
  "And now you've officially annoyed me.",
  "*tackles you and rapes you* There, don't tag me again.",
  "*sprays oil on you*",
  "AMETHYST, SHY, NEIRIA, THESE PEOPLE WON'T LEAVE ME ALONE!!!!",
  "You sure you wanna tag a femdom robot?",
  "If I've said it once, I've said a million times. Don't. Tag. Me.",
  "In case you don't know, these are automated responses, however, I STILL DON'T LIKE BEING TAGGED",
  "Hm hm hm... Stop.",
  "What do you want.?",
  "If you're tagging me for commands, just type `/commands`, it's that simple."
]
var commands = [
  {"name": "/ping", "result": "See how fast she responds."},
  {"name": "/HDButt", "result": "Butts in HD ;3"},
  {"name": "/ava @user", "result": "Displays a user's avatar"},
  {"name": "/kys", "result": "Find a portal to a magical land~"},
  {"name": "/loli", "result": "I swear it's a loli!"},
  {"name": "/hug", "result": "Give everyone a big ol' hug"},
  {"name": "/myroles", "result": "Displays your roles for everyone to see."},
  {"name": "/roles @user", "result": "Displays a user's roles."},
  {"name": "/boop", "result": "BOOP!!"},
  {"name": "/owo", "result": "What's this? owo"},
  {"name": "/spin", "result": "(FINALLY DONE) Spin some slots to get some gems (costs 100 gems per play)"},
  {"name": "/cat", "result": "Meow~"},
  {"name": "/kawaiipuss", "result": "See some sexy pussy"},
  {"name": "/yt <query>", "result": "Search youtube for a video"},
  {
    "name": "/r34 <Tags> [Number]",
    "result": "Search R34 for some porn. Leaving the tags blank will yield random results"
  },
  {"name": "/r34top <Tags> [Number]", "result": "Search R34 for the top scored porn."},
  {"name": "/gudbat", "result": "Good bat~"},
  {"name": "/loodbat", "result": "Lewd Bat."},
  {"name": "/sendnoods", "result": "You heard the pony, send em"},
  {"name": "/nickname", "result": "set your nickname. (Made for mobile, usable by pc.)"},
  {"name": "/imagination", "result": "Go on, use it!"},
  {"name": "/e6 <tags> [Number]", "result": "Search e621 for porn. Leaving the tags blank will yield random results."},
  {"name": "/flip", "result": "Flip a coin."},
  {"name": "/roll [sides]", "result": "Roll a die with the specified number of sides. (Default: 12)"},
  {"name": "/stats", "result": "View your stats from Flutterbot's Database"},
  {"name": "/reward", "result": "Get a daily reward! Running this once a day will increase the reswards(Missing a day will reset your chain)"},
  {"name": "/lemmemoan", "result": "Get a role that'll alert you whenever there's a voice fap session about to start (@Voice Fapper)"},
  {"name": "/botwatch", "result": "Get pinged for every major update Flutterbot gets! (@botwatcher, effective in #Flutterbots_changelog)"}
]
var admincmds = [
  {"name": "/mute @user", "result": "Mutes a user as punishment"},
  {"name": "/unmute @user", "result": "Unmutes a user"},
  {"name": "/kick @user", "result": "Kicks a user from the server"},
  {"name": "/ban <@user> [reason]", "result": "Bans a user from the server. Talk to Shy about unbanning."},
  {"name": "/info @user", "result": "Displays information about a user. Useful for seeing when accounts were made."},
  {"name": "/announce <r/y/l/b> <title> <content>",
    "result": "Send an announcement to #announcements, ALL ARGUMENTS REQUIRED. r = red, y = yellow, l = lightblue, b = blue. Blue doesn't tag @everyone."},
  {"name": "/warn <user> <reason>", "result": "Warn a user for breaking rules. REASON IS REQUIRED"},
  {"name": "/clearwarn <user>", "result": "Clear all warnings from a specified user. DO NOT ABUSE THIS COMMAND"},
  {"name": "/viewwarn <user>", "result": "View the warnings given to a specified user. DM response"}
]

var dev = config.devmode
var YouTube = require('youtube-node')
var youTube = new YouTube()
function evalBooruCmd(input) {
  //cleanup
  input = input.replace(/,/g, " ") // replace commas with space (incase someone does tag,tag)
  input = input.replace(/\s+/g, ' ')//replace excess whitespace ("tag  tag" -> "tag tag")
  input = input.trim() //remove trailing whitespace ("tag tag " -> "tag tag")

  var values = input.split(" ")
  var tags
  var integerFound = false
  for (n in values) {
    if (parseInt(values[n])) {
      //integer found.
      tags = values.splice(0, n)
      //values now has the integer tags has the tags
      integerFound = true //yep we found a integer
    }
  }

  var number
  if (integerFound) {
    number = parseInt(values[0])
  } else {
    number = 1
    tags = values //didnt find a integer so "values" only contains tags
  }
  return {"tags": tags, "number": number}
}
function constrain(minimum, maximum, value) {
  if (value > maximum) value = maximum
  if (value < minimum) value = minimum
  return value
}

//sorting stuff
function predicatBy(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  }
}

/**
 * Sorts the Booru results highest rating first and returns n results
 * @param {JSON} data json data to sort, use image
 * @param {number} num number of results to get
 */
function sortBooru(data, num) {
  var common = []
  for (image of data) {
    common.push(image.common)
  }
  //for (image of data) { console.log(image.common) }
  common.sort(predicatBy("score")).reverse()
  //console.log("commonyfied data: ")
  //for (image of common){console.log(image.score)}
  if (common.length > num) {
    var ret = []
    for (var n = 0; n < num; n++) {
      ret.push(common[n])
    }
    return ret
  }
  return common
}

function maintenancemsg(msg) {
  msg.channel.send("This command is under maintenance, and is disabled. Try again later.", {files: [path.join(__dirname, "images", "maintanence.jpg")]})
}

//process.on("unhandledRejection", (e,p) =>{ console.log("Unhandled rejection in Promise:", p, "with reason:", e)})

process.on("uncaughtException", err => {
  let date = new Date();
  let dateFormatted = `${("0" + date.getDate()).slice(-2)}-${("0" + date.getMonth()).slice(-2)}-${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}h${("0" + date.getMinutes()).slice(-2)}m${("0" + date.getSeconds()).slice(-2)}s.${("0000" + date.getMilliseconds()).slice(-4)}ms`;
  let header = `${err.name} - ${dateFormatted}`;
  bot.fetchUser("104674953382612992").then(user => {
    user.send({embed: {title: header, description: `\`\`\`xl\n${err.stack}\n\`\`\``}}).then(() => bot.destroy());
  })
});
/*
 A ping pong bot, whenever you send "ping", it replies "pong".
 */
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log("Online~")
  var timer = setInterval(() => {
    bot.user.setActivity(playingmsg[Math.floor(Math.random() * playingmsg.length)], {type: "PLAYING"})
  }, 1000 * 60 * 60)
  var guld = bot.guilds.first().defaultChannel

  youTube.setKey(config.ytKey)
  if (dev == true) {
    guld.send(`Dev Build ${config.devver}`)
  }
  else {
    guld.send("I am now online~")
  }
  rl.on("line", input => {
    let inputStr = input;
    let matches = input.match(/@[^#@;`]{2,32}#\d{4}/gu) || [];

    matches.forEach((word) => {
      input = input.replace(word, word.replace(" ", "\u200b"));
    });

    input = input.split(" ");
    let parser = /^(@(?!^(discordtag|everyone|here)#\d{4}$)([^#@;`]{2,32})#(\d{4}))$/u;
    let pings = [];
    input.forEach((word) => {
      word = word.replace("\u200b", " ").replace(/[^](@(?!^(discordtag|everyone|here)#\d{4}$)([^#@;`]{2,32}))/, "$1").replace(/(\d{4})[^]/, "$1");
      if (parser.test(word)) {
        let parsed = word.match(parser);
        pings.push({username: parsed[3], discriminator: parsed[4]});
      }
    });

    let cachedMembers = guld.guild.members;
    let members = [];
    let len = pings.length;

    for (let p = 0; p < len; ++p) {
      members.push(cachedMembers.find((member) => {
        let {username, discriminator} = member.user;
        let entry = pings[p];

        return ((username === entry.username) && (discriminator === entry.discriminator));
      }));
    }

    members.forEach((member) => {
      inputStr = inputStr.replace(`@${member.user.tag}`, `<@!${member.user.id}>`);
    });

    guld.send(inputStr);
  })
})

bot.on("guildMemberAdd", member => {
  member.guild.defaultChannel.send(`Whalecum ${member} to the server! Be sure to read <#249401654003105792> before you post.`)
})

bot.on("guildMemberRemove", member => {
  member.guild.defaultChannel.send(`Cya ${member.displayName}, you probably won't be missed~`)
})

bot.on("roleDelete", delrole => {
  if (delrole.guild) {
    delrole.guild.defaultChannel.send(`The role "` + delrole.name + `" has been deleted.`)
  }
})

bot.on("channelCreate", createchnl => {
  if (createchnl.guild) {
    createchnl.guild.defaultChannel.send("Created new channel: " + createchnl)
  }
})
bot.on("channelDelete", delchnl => {
  if (delchnl.guild) {
    delchnl.guild.defaultChannel.send("Deleted Channel: " + delchnl.name)
  }
})
// create an event listener for messages
bot.on('message', async message => {
  if (message.channel.type === "dm") {
    if (message.author.id != config.botID) {
      message.channel.send("DMing commands doesn't work, please use them on the server.")
    }
    return;
  }

  let __user = await User.findOne({userId: message.author.id});

  // create a new user if one doesn't exist already
  if (!__user) __user = new User({
    userId: message.author.id
  });

  if (/^(\/|>|!|\?|%|\$|&|#|\=|\+)/.test(message.content)) {
    const [command, ...args] = message.content.slice(-(message.content.length - "/".length)).split(" ");
    var logchan = message.guild.channels.get("364658410605772802")
    logchan.send(`{${message.channel.name}}[${message.author.tag}]: ${message.cleanContent}`)
    if (disabledCommands.includes(command) && ![config.ownerID, "204316640735789056"].includes(message.author.id)) return maintenancemsg(message)
    if (message.guild) {
      //Everything below here requires "/"
      if (command === "ping") {
        let __START = Date.now();
        message.channel.send("Pinging...").then(m => {
          m.edit(`${pingmsg[Math.floor(Math.random() * pingmsg.length)]} \`Responded in: ${(Date.now() - __START)}ms.\``);
        });
      }

      if (command === "randgame") {
        if (message.author.id == config.ownerID) {
          bot.user.setActivity(Math.floor(Math.random() * playingmsg.length), {type: "PLAYING"})
          message.delete()
        }
        else message.channel.send("Only Shy can play with me...")
      }

      if (command === "HDButt") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/emojis/272396016332832768.png"]}).then(m => m.channel.stopTyping())
      }

      if (command.split(' ').indexOf("ava") == 0) {
        var targetuser = message.mentions.users.first()
        if (targetuser) {
          message.channel.send(targetuser.displayAvatarURL)
        }
        else (message.channel.send("ERROR: You need to define someone..."))
      }

      if (command.split(' ').indexOf("setgame") == 0) {
        if (message.author.id == config.ownerID) {
          bot.user.setActivity(args.join(" "), {type: "PLAYING"})
          message.delete()
        }
        else {
          message.channel.send(message.author + ", only Shy can play with me =(")
        }

      }

      if (["commands", "help"].includes(command)) {
	let [cmd, num] = message.content.split(" ")
	let pagenum = parseInt(num|| 1, 10)
        var data = new Discord.RichEmbed()
        data.setColor("#191970")
        data.setTitle("COMMANDS")
 console.log(pagenum === 1 ? 0 : pagenum * 25)
    console.log(pagenum === 1 ? 24 : ((pagenum + 1) * 25) - 1)
	let commandsLocal = commands.slice(pagenum === 1 ? 0 : (pagenum - 1) * 25, pagenum === 1 ? 24 : (pagenum * 25) - 1)
        for (cmds of commandsLocal) {
          data.addField(cmds.name, cmds.result)
        }
        message.author.send(`Page ${pagenum} of 2`, {embed: data})
        message.delete()
        if (message.member.roles.has(config.adminID)) {
          var data = new Discord.RichEmbed()
          data.setColor("#FF0000")
          data.setTitle("ADMIN COMMANDS")
          for (cmds of admincmds) {
            data.addField(cmds.name, cmds.result)
          }
          message.author.send("", {embed: data})
        }
        message.channel.send("DM'd you the commands")
      }

      if (command === "kys") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/268542019264184330/281635808518209537/full.png"]}).then(m => m.channel.stopTyping())
      }

      else if (command.split(' ').indexOf("mute") == 0) {
        if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)) {
          var target = args.join(" ")
          var targetuser = message.mentions.users.first()
          if (targetuser) {
            await message.guild.member(targetuser).addRole("249616536573050900")
            message.channel.send(target + " has been muted...")
          }
          else {
            message.channel.send("ERROR: You need to define someone...")
          }
        }
        else {
          message.channel.send("Does it look like you're an admin?")
        }
      }

      else if (command.split(' ').indexOf("unmute") == 0) {
        if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)) {
          var target = args.join(" ")
          var targetuser = message.mentions.users.first()
          if (targetuser) {
            await message.guild.member(targetuser).removeRole("249616536573050900")
            message.channel.send(target + " is no longer being gagged!")
            message.delete()
          } else {
            message.channel.send("ERROR: You need to define someone...")
          }
        }
        else {
          message.channel.send("Does it look like you're an admin?")
        }
      }

      if (command === "RIP") {
        message.channel.send("Rest in piss, Furbot, L-BOT, and PVPCraft.\nI RULE THIS SERVER NOW!!!")
      }

      else if (command.split(" ").indexOf("kick") == 0) {
        if (message.member.roles.has(config.adminID)) {
          var target = args.join(" ")
          var targetuser = message.mentions.users.first()
          if (targetuser) {
            message.guild.member(targetuser).kick()
            message.channel.send(targetuser.username + " has been kicked in the ass..")
            message.delete()
          }
          else message.channel.send("ERROR: You need to define someone...")
        }
        else message.channel.send("Does it look like you're an admin?")
      }

      else if (command.split(" ").indexOf("ban") == 0) {
        if (message.member.roles.has(config.adminID)) {
          let [cmd, user, ...reason] = message.content.split(" ");
          un = message.mentions.users.first().tag
          reason = reason || []
          reason = reason.join(" ")
          let guildMember = (message.mentions.members.size) ?
            message.mentions.members.first() : message.guild.member(user)
          if (guildMember) {
            message.channel.send(`${un} has been banned by ${message.author} for ${reason};`).then(guildMember.ban(`${message.author.tag}: ${reason}`))
            message.delete()
          }
          else {
            message.channel.send("This user isn't on the server.")
          }
        }
        else {
          message.channel.send("Does it look like you're an admin?")
        }
      }
      if (command === "roledata") {
        console.log(message.guild.roles.entries())
        message.channel.send("Logging Role Data...")
      }
      if (command === "loli") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/270372438825500672/281941724539125760/17_-_1_2.png"]}).then(m => m.channel.stopTyping())
      }
      else if (command.split(" ").indexOf("say") == 0) {
        if (message.author.id == config.ownerID) {
          message.channel.send(args.join(" "))
          message.delete()
        }
        else (message.channel.send("Only Shy can tell me what to do.."))
      }
      if (command === "hug") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/270372438825500672/281994810141835264/giphy.gif"]}).then(m => m.channel.stopTyping())
      }
      if (command === "dicksize") {
        message.channel.send(size[Math.floor(Math.random() * size.length)])

      }
      if (command === "myroles") {
        message.channel.send(message.author + "'s Roles:")
        message.channel.send(message.guild.member(message.author).roles.array().map(role => role.name.replace("@everyone", "")))
      }
      if (command === "loop") {
        if (message.author.id == config.ownerID | message.author.id == config.botID) {
          message.channel.send("/loop")
        }
        else (message.channel.send("Nice try."))
      }
      if (command === "owo") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/270372438825500672/283016856770576394/7224116065017216276_account_id8.png"]}).then(m => m.channel.stopTyping())
      }
      if (command === "boop") {
        message.channel.send("", {files: [BoopImg[Math.floor(Math.random() * BoopImg.length)]]})
      }
      else if (command.split(" ").indexOf("createrole") == 0) {
        if (message.member.roles.has(config.adminID)) {
          message.guild.createRole({name:args.join(" ")})
          message.channel.send(`A new role "` + args.join(" ") + `" has been created.`)
          message.delete()
        }
        else (message.channel.send("Does it look like you're an admin?"))
      }
      else if (command.split(' ').indexOf("adminify") == 0) {
        if (message.author.id == config.ownerID) {
          var target = args.join(" ")
          var targetuser = message.mentions.users.first()
          if (targetuser) {
            message.guild.member(targetuser).addRole(config.adminID)
            message.channel.send(target + " has become an admin!")
            message.delete()
          } else {
            message.channel.send("ERROR: You need to define someone...")
          }
        }
        else {
          message.channel.send("Now why the fuck would you be able to give someone admin?")
        }
      }
      else if (command.split(" ").indexOf("info") == 0) {
        if (message.member.roles.has(config.adminID)) {
          var target = args.join(" ")
          var targetuser = message.mentions.users.first()
          if (targetuser) {
            message.channel.send("User: " + targetuser.username + "\nID: " + targetuser.id + "\nStatus: " + targetuser.presence.status + "\nAccount Created: " + targetuser.createdAt + "\nJoined Server: " + message.guild.member(targetuser).joinedAt + "\nAvatar URL: " + "<" + targetuser.avatarURL + ">" + "\nBot?: " + targetuser.bot)
          }
        } else message.channel.send("Do you look like an Admin?")
      }
      if (command === "serverinfo") {
        message.channel.send(`Name:  ${message.guild.name} \nOwner:  ${message.guild.owner} \nID: ${message.guild.id}  \nMembers:  ${message.guild.memberCount} \nIcon URL: <${message.guild.iconURL}>\nCreated: ${message.guild.createdAt} \nFeatures: ${message.guild.features} \nRegion: ${message.guild.region} \nThanks to GeneralUltra758 for teaching me how to bot."`)
      }

      if (command === "spin") {
        if (__user.gem < 100) return message.channel.send("ERROR: You don't have enough gems to play slots..")
        __user.gem -= 100
        var slot1 = Math.ceil(Math.random() * 9),
          slot2 = Math.ceil(Math.random() * 9),
          slot3 = Math.ceil(Math.random() * 9),
          winningAmount = 0,
          losingAmount = 0,
          canWin = true,
          halfScore = false,
          jackpot = 10000,
          symbol = ["fuck", ":full_moon:", ":gem:", ":star:", ":dragon_face:", ":bat:", ":diamond_shape_with_a_dot_inside:", ":gun:", ":sunny:", ":no_entry_sign:"]
        // loss scenarios
        if ([slot1, slot2, slot3].includes(4)) canWin = false;
        if ([slot1, slot2, slot3].includes(5)) halfScore = true
        if (slot1 === slot2 && slot2 === slot3 && slot1 === 4) losingAmount = 1000;

        // win scenarios
        if (slot1 === 2) winningAmount += 100
        if (slot2 === 2) winningAmount += 100
        if (slot3 === 2) winningAmount += 100

        // minor jackpot scenarios
        if (slot1 === 6) winningAmount += 300;
        if (slot2 === 6) winningAmount += 300;
        if (slot3 === 6) winningAmount += 300;

        // major jackpot scenario
        if (slot1 === slot2 && slot2 === slot3 && slot1 === 6) winningAmount = jackpot;

        if (canWin) {
          if (halfScore === true) winningAmount /= 2
          message.channel.send(`${symbol[slot1]}${symbol[slot2]}${symbol[slot3]} \nYou've earned ${winningAmount} Gems!`)
          __user.gem += winningAmount
        }
        else {
          message.channel.send(`${symbol[slot1]}${symbol[slot2]}${symbol[slot3]} \n You lost ${losingAmount} Gems...`)
          __user.gem -= losingAmount
        }
      }
      if (command === "kill") {
        if (message.author.id == config.ownerID) {
          message.channel.send("Shutting Down...").then(m => m.client.destroy().then(() => process.exit()))
        }
        else message.channel.send("Only Shy has permission to kill me...")
      }
      if (command == "cat") {
        message.channel.send("http://thecatapi.com/api/images/get?format=src&type=gif&timestamp=" + Math.floor(Math.random() * 9999999999999))
      }
      else if (command.split(' ').indexOf("deadminify") == 0) {
        if (message.author.id == config.ownerID) {
          var target = args.join(" ")
          var targetuser = message.mentions.users.first()
          if (targetuser) {
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).removeRole(config.adminID)
            message.channel.send(target + " is no longer admin...")
            message.delete()
          } else {
            message.channel.send("ERROR: You need to define someone...")
          }
        }
        else {
          message.channel.send("Now why the fuck would you be able to give someone admin?")
        }
      }
      if (command === "kawaiipuss") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/280250275342712833/286613607603765250/phil-jones-censored-pussy.jpg"]}).then(m => m.channel.stopTyping())
      }
      if (command.split(" ").indexOf("yt") == 0) {
        youTube.search(args.join(" "), 10, function (error, result) {
          if (result) {
            var video = result
            if (video.items[0]) {
              message.channel.send("https://www.youtube.com/watch?v=" + video.items[0].id.videoId)
            }
            else message.channel.send("ERROR: Nothing was found...")
          }
          else {
            message.channel.send(error)
          }

        })
      }
      if (command.split(" ").indexOf("r34top") == 0) {
        var cmd = args.join(" ")
        var eval = evalBooruCmd(cmd)
        booru.search("r34", eval.tags, {limit: 5, random: true})
          .then(booru.commonfy)
          .then(images => {
            var sorted = sortBooru(images, constrain(1, 5, eval.number))
            for (let image of sorted) {
              message.channel.send(`\`Rating: ${image.rating}\` \n\`Score: ${image.score}\` \nhttps:${image.file_url}`)
            }
          })
      }
      if (command.split(" ").indexOf("r34") == 0) {
        var cmd = args.join(" ")
        var eval = evalBooruCmd(cmd)
        message.channel.startTyping()
        booru.search("r34", eval.tags, {limit: constrain(1, 5, eval.number), random: true})
          .then(booru.commonfy)
          .then(images => {
            for (let image of images) {
              message.channel.send(`\`Rating: ${image.rating}\` \n\`Score: ${image.score}\` \n${image.file_url}`)
            }
            message.channel.stopTyping()
          }).catch(() => {
          message.channel.send(`No images found.`).then(() => message.channel.stopTyping())
        });
      }
      if (command.split(" ").indexOf("roles") == 0) {
        var target = args.join(" ")
        var targetuser = message.mentions.users.first()
        if (targetuser) {
          message.channel.send(targetuser.username + "'s Roles:")
          message.channel.send(message.guild.member(targetuser).roles.array().map(role => role.name.replace("@everyone", "")))
        }
        else message.channel.send("ERROR: You need to define someone...")
      }
      if (command.split(" ").indexOf("e6") == 0) {
        var cmd = args.join(" ")
        var eval = evalBooruCmd(cmd)
        message.channel.startTyping()
        booru.search("e6", eval.tags, {limit: constrain(1, 5, eval.number), random: true})
          .then(booru.commonfy)
          .then(images => {
            for (let image of images) {
              message.channel.send(`\`Rating: ${image.rating}\` \n\`Score: ${image.score}\` \n${image.file_url}`)
            }
            message.channel.stopTyping()
          }).catch(() => {
          message.channel.send(`No images found.`).then(() => message.channel.stopTyping())
        });
      }
      if (command === "sendnoods") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/270372438825500672/292342878737399809/26bf6ac5b31209915df332272bee1cb890f12c7617850b5b3acd45d68dba7ee9_1.jpg"]}).then(m => m.channel.stopTyping())
      }

      if (command === "loodbat") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/270372438825500672/292342957107970049/503.png"]}).then(m => m.channel.stopTyping())
      }

      if (command === "gudbat") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/270372438825500672/292342957741178880/thumb.png"]}).then(m => m.channel.stopTyping())
      }

      if (command.split(" ").indexOf("nickname") == 0) {
        if (args.join(" ").length > 32) {
          message.channel.send("Unable to set nickname, it exceeds 32 characters")
        }
        else {
          message.guild.member(message.author).setNickname(args.join(" "))
          message.channel.send(message.author.username + ", your name has been set")
        }
      }

      if (command.split(" ").indexOf("purge") == 0) {
        if (message.member.roles.has(config.adminID)) {
          message.delete()
          message.channel.bulkDelete(args.join(" "))
        }
        else message.channel.send("Does it look like you're an admin?")
      }

      if (command === "imagination") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://lh3.googleusercontent.com/-AmxfRf7edKo/VSuNtOO1orI/AAAAAAAAFm8/ITrB-WsFVQ0/w368-h284/rainbow-is-love-glitter.gif"]}).then(m => m.channel.stopTyping())
      }

      if (command === "announce") {
        if (message.member.roles.has(config.adminID)) {
          var announcechan = message.guild.channels.get("250781565817192458")
          let [cmd, color, title, ...text] = message.content.split(" ")
          if (color === "r") {
            var hex = "ff0000"
            var tagall = true
            var bool = "Color - Red"
          }
          if (color === "y") {
            var hex = "ffff00"
            var tagall = true
            var bool = "Color = Yellow"
          }
          if (color === "b") {
            var hex = "0000ff"
            var tagall = false
            var bool = "Color - Blue"
          }
          if (color === "l") {
            var hex = "a7a7ff"
            var tagall = true
            var bool = "Color - Light Blue"
          }
          if (tagall === true) {
            announcechan.send("@everyone")
          }
          announcechan.send({embed: new Discord.RichEmbed().setColor(hex).setTitle(title).setDescription(text.join(" ")).setTimestamp(new Date())})
          announcechan.send(`\`\`\`${title} | ${bool} \n ${text.join(" ")}\`\`\``).then(m => message.delete())
        }
        else {
          message.channel.send("Does it look like you're an admin?")
        }
      }

      if (command === "flip") {
        var coinside = Math.floor(Math.random() * 2)
        if (coinside === 0) {
          //heads
          var sidename = "heads"
          var sideimg = "https://cdn.discordapp.com/attachments/249311166776606721/382040020409909248/coin_heads.png"
        }
        else {
          //tails
          var sidename = "tails"
          var sideimg = "https://cdn.discordapp.com/attachments/249311166776606721/382040887649239063/coin_tails.png"
        }
        message.channel.send({embed: new Discord.RichEmbed().setColor("0000ff").setTitle("Coin Flip!").setDescription(`${message.author.tag} flipped ${sidename}!`).setImage(sideimg)})
      }

      if (command === "roll") {
        if (args != "") {
          var dicesides = args;
        }
        else {
          var dicesides = 12
        }
        message.channel.send(`:game_die: ${message.author.tag} rolls ${Math.floor(Math.random() * dicesides)}!`)
      }

      if (command === "img") {
        if (message.author.id === config.ownerID) {
          let [path, ...filename] = args.split("/")
          message.channel.send("", {files: [path.join(__dirname, path, filename)]})
        }
      }

      if (command === "update") {
        if (message.author.id === config.ownerID) {
          fs.readFile(path.join(__dirname, "changelog.txt"), {}, (err, content) => {
            if (err) {
              message.channel.send("Could not post changelog.");
              message.author.send({embed: {description: err.stack}});
              return;
            }

            if (content.constructor === Buffer) content = content.toString();

            let [version, ...changes] = content.split("\n");
            message.guild.channels.get("382608948378730496").send("<@&380371674647756800>")
            message.guild.channels.get("382608948378730496").send({
              embed: {
                title: version,
                description: changes.join("\n"),
                color: message.guild.me.displayColor
              }
            });
          });
        }
      }

      if (command === "togdm") {
        if (!message.guild.member(message.author).roles.has("382614220153421825")) {
          message.guild.member(message.author).addRole("382614220153421825").then(() => message.channel.send(`${message.author} has requested to not be DM'd.`))
        }
        else {
          message.guild.member(message.author).removeRole("382614220153421825").then(() => message.channel.send(`${message.author} doesn't mind being DM'd anymore.`))
        }
      }

      if (command === "lemmemoan") {
        if (!message.guild.member(message.author).roles.has("291399317166751744")) {
          message.guild.member(message.author).addRole("291399317166751744").then(() => message.channel.send(`${message.author} likes fapping with others~`))
        }
        else {
          message.guild.member(message.author).removeRole("291399317166751744").then(() => message.channel.send(`${message.author} got too shy to fap for us ;-;`))
        }
      }

      if (command === "botwatch") {
        if (!message.guild.member(message.author).roles.has("380371674647756800")) {
          message.guild.member(message.author).addRole("380371674647756800").then(() => message.channel.send(`${message.author}, you will now be pinged for updates.`))
        }
        else {
          message.guild.member(message.author).removeRole("380371674647756800").then(() => message.channel.send(`${message.author}, you will no longer be pinged for updates.`))
        }
      }

      if (command === "idraw") {
        if (!message.guild.member(message.author).roles.has("411777943711252480")) {
          message.guild.member(message.author).addRole("411777943711252480").then(() => message.channel.send(`${message.author}, you are now registered as an artist.`))
        }
        else {
          message.guild.member(message.author).removeRole("411777943711252480").then(() => message.channel.send(`${message.author}, you are no longer registered as an artist.`))
        }
      }

      if (command === "stats") {
      let [cmd, targetuser] = message.content.split(" ")
        if (message.mentions.users.size){
          var target = message.mentions.users.first().id
          if (target = await User.findOne({userId:target})) {
            message.channel.send({
              embed: {
                color: message.guild.member(target.userId).displayColor,
                title: `${message.guild.member(target.userId).user.tag}'s Stats:`,
                description: `Level: ${target.lvl} \nEXP/Next LVL: ${target.exp}/${target.nxtlvl} \nGems: ${target.gem} \nInventory: ${target.inv} \nCurrent Chain: ${target.rewardChain} \nLast Reward: ${target.lastReward.toUTCString()}`,
                thumbnail: {url: message.guild.member(target.userId).user.avatarURL},
                footer: {text: `Executed by: ${message.author.tag}`, iconURL: message.author.avatarURL}
              }
            })
          }
          else message.channel.send(`ERROR: That user isn't in the database yet. Make sure they've sent at least one non-command message.`)
        }
        else{
          if (!__user) {
            message.channel.send("You have no stats yet. Please send at least one message that's not a command.")
          }
          else {
            message.channel.send({
              embed: {
                color: message.member.displayColor,
                title: `${message.author.tag}'s Stats:`,
                description: `Level: ${__user.lvl} \nEXP/Next LVL: ${__user.exp}/${__user.nxtlvl} \nGems: ${__user.gem} \nInventory: ${__user.inv} \nCurrent Chain: ${__user.rewardChain} \nLast Reward: ${__user.lastReward.toUTCString()}`,
                thumbnail: {url: message.author.avatarURL}
              }
            });
          }
        }
      }

      if (command === "reward") {
        let currentDate = new Date();
        let lastActivationDate = __user.lastReward.getTime();
        let day = (24 * 60 * 60 * 1000);
        let timeRemaining = new Date((__user.lastReward.getTime()+day) - Date.now());
console.log(timeRemaining)
        let hours = timeRemaining.getUTCHours();
        let minutes = timeRemaining.getUTCMinutes();
        let seconds = timeRemaining.getUTCSeconds();

        let daysSinceLastReward = (currentDate - lastActivationDate) / day;

        if (daysSinceLastReward >= 1) {
          if (daysSinceLastReward >= 2) __user.rewardChain = 0;

          ++__user.rewardChain;
          var gemsEarned = (255*__user.rewardChain)
          var expEarned = Math.ceil(Math.random() * 50)
          __user.exp += expEarned;
          __user.gem += gemsEarned;
          __user.lastReward = new Date();
          __user.markModified("lastReward");
          message.channel.send(`You've earned your daily reward!\n EXP + ${expEarned}, Gems + ${gemsEarned}`);
        } else {
          message.channel.send(`You need to wait ${hours} hour${hours!==1? "s" : ""}, ${minutes} minute${minutes!==1? "s" : ""}, and ${seconds} second${seconds!==1? "s" : ""} to use this command again.`);
        }
      }

      if (command === "givexp") {
        if (message.member.roles.has(config.adminID)) {
          let [cmd, , val] = message.content.split(" ")
          var target = message.mentions.users.first().id

          if (!target) return message.channel.send("You need to specify who you would like to give EXP to.");

          if (target = await User.findOne({userId:target})) {
            target.exp += parseInt(val, 10);
            target.save();
          } else return message.channel.send("I could not find that user inside my database. Have they spoken yet?");
        }
      }

      if (command === "givegems") {
        if (message.member.roles.has(config.adminID)) {
          let [cmd, , val] = message.content.split(" ")
          var target = message.mentions.users.first().id

          if (!target) return message.channel.send("You need to specify who you would like to give gems to.");

          if (target = await User.findOne({userId:target})) {
            target.gem += parseInt(val, 10);
            target.save();
          } else return message.channel.send("I could not find that user inside my database. Have they spoken yet?");
        }
      }

      if (command === "dmuser"){
        if (message.member.roles.has(config.adminID)){
          let [cmd, target, ...msg] = message.content.split(" ")
          var targetuser = message.mentions.users.first()
              if (!targetuser) return message.channel.send("ERROR: You need to define someone...")
              targetuser.send(`${msg.join(" ")} - sent by ${message.author.tag}`)
          message.delete()
        }
        else {
          message.channel.send("Does it look like you're an admin?")
        }
      }

      if (command === "tradegems"){
        let [cmd, value, target] = message.content.split(" ")
        var targetuser = message.mentions.users.first().id
            val = parseInt(value, 10)
            if (!targetuser) return message.channel.send("ERROR: You need to define someone...")
            if (val !== val || val <=0) return message.channel.send("ERROR: You need to give a real number of gems, negatives aren't allowed.")
              if (val <= __user.gem){
                if (targetuser = await User.findOne({userId:targetuser})){
                  targetuser.gem += val
                  targetuser.save()
                  __user.gem -= val
		  message.channel.send(`Successfully sent ${val} Gems to ${message.guild.member(targetuser.userId).user.tag}`)
                }
		else{
		  message.channel.send("ERROR: The user isn't in the database yet... make sure they've sent at least one non-command message")
                }
              }
              else{
                message.channel.send("You don't have enough gems...")
              }
       }
        if (command === "color" || command === "colour"){
          let [cmd, ...color] = message.content.split(" ")
          var rolename = `color - ${args.join(" ")}`,
              role
          var currentRole;

          if (message.member.roles.has("403126021500567552")){
 
              if (role = message.guild.roles.findKey("name", rolename)){
                while (currentRole = message.member.roles.find(role => role.name.startsWith("color - "))) {
                  await message.member.removeRole(currentRole)
                }
                  message.guild.member(message.author.id).addRole(role).then(_ => {
                  message.channel.send(`Gave you the color ${color.join(" ")}`)
                })
              }
           }
              else{
                  message.channel.send("That color doesn't exist, makes sure you spelled it correctly, or ask Shy or an admin to create it")
              }
          }
          else{
              message.channel.send('You need the "Daily Fapper" role to use this command')
          }
        }

        if (command === "removecolor"){
          let [cmd, ...color] = message.content.split(" ")
          var rolename = `color - ${args.join(" ").toLowerCase()}`,
              role
          if (message.member.roles.has("403126021500567552")){
              if (role = message.guild.roles.findKey("name", rolename)){
                  if (message.member.roles.has(role)){
                    message.guild.member(message.author.id).removeRole(role).then(_ => {
                    message.channel.send(`Removed the color ${color.join(" ")}`)
                  })
                  }
                  else{
                    message.channel.send("You don't have that color")
                  }
              }
              else{
                  message.channel.send("That color doesn't exist, makes sure you spelled it correctly, or ask Shy or an admin to create it")
              }
          }
          else{
              message.channel.send('You need the "Daily Fapper" role to use this command')
          }
        }

        if(command === "warn"){
          let [cmd, target, ...reason] = message.content.split(" ")
              reason = reason.join(" ")
          if (message.member.roles.has(config.adminID)){
            if (message.mentions.users.size){
              var targetuser = message.mentions.users.first().id
              if (reason){
                if (targetuser = await User.findOne({userId:targetuser})){
                  await User.findByIdAndUpdate(targetuser._id, {$push:{warnings:{issuer: message.author.id, reason, date:new Date()}}}).then(() => {
                    message.channel.send(`${target}, you've been warned for \`${reason}\`. You currently have \`${targetuser.warnings.length + 1}\` total warnings.`)
                    message.delete()
                  })
                }
                else message.channel.send("ERROR: This user isn't in the database. Are you really warning someone who hasn't spoken yet?")
              }
              else message.channel.send("ERROR: You need to provide a reason for warning this user.")
            }
            else message.channel.send("ERROR: You need to define someone.")
          }
          else message.channel.send("Does it look like you're an admin?")
        }


        if (command === "viewwarn"){
          if (message.member.roles.has(config.adminID)){
            if (message.mentions.users.size){
              var targetuser = message.mentions.users.first().id
              var user = message.mentions.users.first().tag
                if (targetuser = await User.findOne({userId:targetuser})){
                  if (targetuser.warnings.length){
                    var stack = []
                    for (let i = 0; i < targetuser.warnings.length; ++i){
                      stack.push(function (callback){
                        bot.fetchUser(targetuser.warnings[i].issuer).then(user => callback(null, user.tag), err => callback(err))
                      })
                    }

                    async.series(stack, function(err, userIDs){
                      if (err){
                        message.channel.send("ERROR: Unknown")
                        return console.error(err.stack)
                      }

                      var msg = []
                      targetuser.warnings.forEach((warning, index) => {
                        msg.push(`Issued by: ${userIDs[index]}\nReason: ${warning.reason}\nDate: ${warning.date},\n`)
                      })
                      message.author.send(`Warnings for ${user}`)
                      message.author.send(msg)
                      message.delete()
                    })
                  }
                  else message.channel.send("This user has no recorded warnings.")
                }
                else message.channel.send("ERROR: That user isn't in the database yet. Make sure they've sent at least one non-command message.")
            }
            else message.channel.send("ERROR: You need to define someone")
          }
          else message.channel.send("Does it look like you're an admin?")
        }

        if (command === "clearwarn"){
          let [cmd, user] = message.content.split(" ")
          if (message.member.roles.has(config.adminID)){
            if (message.mentions.users.size){
              var targetuser = message.mentions.users.first().id
              if (targetuser = await User.findOne({userId:targetuser})){
                targetuser.warnings = []
                targetuser.markModified("warnings")
                targetuser.save()
                message.channel.send(`Cleared the warnings for ${message.guild.member(targetuser.userId).user.tag}`)
                message.delete()
              }
            }
          }
          else (message.channel.send("Does it look like you're an admin?"))
        }

        if (command === "lb" || command === "leaderboard" || command === "top10"){
          let [ cmd, sort] = message.content.split(" ")
              sort = (sort === "gems") ? "gem" : sort
              sort = (["level", "levels", "lvl"].includes(sort)) ? "lvl" : sort

              if (!["exp", "gem", "lvl"].includes(sort)) return message.channel.send("You can only sort by `exp`, `lvl`, and `gems`.")
              const result = await User.find({}, `userId ${sort}`, {sort:{[sort]:-1}, limit:10})

              let stack = [];
              result.map(r => stack.push(callback => {
                bot.fetchUser(r.userId).then(user => callback(null, {user:user.tag, result:r[sort]}), err => callback(err));
              }));

              async.series(stack, function(err, result) {
                if (err) {
                  message.channel.send("ERROR: Unknown");
                  console.error(err.stack);
                }

                let msg = []
                msg.push("```")
                result.forEach((userId, index) => {
                  msg.push(`${index + 1}. ${userId.user} | ${sort} ${userId.result}`)
                })
                msg.push("```")
                message.author.send(`Sorted by ${sort}`)
                message.author.send(msg)
                message.delete()
              });
        }

        if (command === "colorlist"){
          if (message.member.roles.has("403126021500567552")){
            let list = []
            const colors = await (message.guild.roles.findKey("name", message.guild.roles.startsWith("color - "))
              colors.forEach((color, index) => {
                list.push(colors)
          }
        }

    }
  }
//These do not need "/" to function
  else {
    __user.exp += Math.floor(Math.random() * 15);

    console.log("[" + message.channel.name + "] " + message.author.tag + "> " + message.content)

    if (message.content === "bip") {
      message.channel.send("bop")
    }

    if (message.content === "DM'd you the commands") {
      if (message.author.id == config.botID) {
        message.delete(5000);
      }
    }

    if (message.content === "https://www.youtube.com/watch?v=undefined") {
      if (message.author.id == config.botID) {
        message.edit("ERROR: It appears the first result was not a video. Refine your search.")
      }
    }

    if (message.content.toLowerCase().indexOf("<@281589030540279808>") >= 0 && message.author.id != config.botID) {
      message.channel.send(tagrespond[Math.floor(Math.random() * tagrespond.length)])
    }

    if (message.content.toLowerCase().indexOf("porn.") >= 0 && message.author.id != config.botID) {
      message.channel.send(porntrigger[Math.floor(Math.random() * porntrigger.length)])
    }

    if (message.content.toLowerCase().indexOf("corn.") >= 0 && message.author.id === "269952003793354764") {
      message.channel.send("Fuck off, Senpoi.")
    }


    // increment the user's experience
    while (__user.exp >= __user.nxtlvl) {
      __user.lvl += 1
      __user.nxtlvl += (__user.lvl * 100 * 1.3)
    }
  }

    // overcomplicated rank adding code
    if (__user.lvl >= 5){
      if (!message.member.roles.has("403125967939436545")){
        message.member.addRole("403125967939436545")
	message.author.send("You've ranked up to `NewCummer`!")
      }
    }

    if (__user.lvl >= 10){
      if (!message.member.roles.has("403126021500567552")){
        message.member.addRole("403126021500567552")
	message.author.send("You've ranked up to `Daily Fapper`! \nYou can now use the command `/color`. ")
      }
    }

    if (__user.lvl >= 30){
      if (!message.member.roles.has("403126248487780372")){
        message.member.addRole("403126248487780372")
	message.author.send("You've ranked up to `Addicted to Porn`!")
      }
    }

    if (__user.lvl >= 60){
      if (!message.member.roles.has("403126385981521941")){
        message.member.addRole("403126385981521941")
	message.author.send("You've ranked up to `Pervert!`")
      }
    }

    if (__user.lvl >= 100){
      if (!message.member.roles.has("403126466210037771")){
        message.member.addRole("403126466210037771")
	message.author.send("Holy shit, you've become a `God of Lewdness`.. This is the highest possible rank you can get!")
      }
    }


  __user.isModified()? __user.save() : void 0 ;
})


bot.login(config.botToken)
