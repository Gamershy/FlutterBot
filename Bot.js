const Discord = require('discord.js');
if (!Discord.Guild.prototype.hasOwnProperty("defaultChannel")) {
  Object.defineProperty(Discord.Guild.prototype, "defaultChannel", {
    get: function () {
      delete this.defaultChannel;
      return this.defaultChannel = this.channels.get("249311166776606721");
    }
  });
}

var addons = {};
var disabledCommands = ["play", "stop"];
//var queue = []

require("./Mongoose/index.js");
const ipc = require("node-ipc");
const async = require("async");
const path = require("path");
const config = require('./config.js');
// noinspection JSCheckFunctionSignatures
const bot = new Discord.Client({
  fetchAllMembers: true,
  disabledEvents: ["TYPING_START"]
});
const readline = require("readline");
const booru = require("booru");
const child_process = require("child_process");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require("fs");

const bindUpdateCallback = require("./level-up");
const roller = Fawn.Roller();

ipc.config.id = "FB";
ipc.config.socketRoot = path.join(__dirname, "sockets");
ipc.config.socketRoot += "/";

//Schema Variables
var User = db.model("User");
var Warn = db.model("Warn");
var Suggestion = db.model("Suggestion");
//console.log(User.update)
//var Item = db.model("Item")

// you know what, imma just put my shit here -Zuris
var suggestionsChannel;
const reactions = {};

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
];
const size = [
  "8================D",
  "8=====D",
  "8=D",
  "8========D",
  ".",
  "8=============D",
  "8==============================D"
];
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
];

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

];

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
];
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
];
const leavemsg = [
  "cya |, you probably won't be missed~",
  "| has decided the porn was too much",
  "No, wait |, come back! I didn't get to rape you!",
  "| has left us. Press F to pay your respex",
  "Error 404, | can no longer be found",
  "RIP |, you might be missed"
];
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
  {"name": "/r34 <Tags> [Number]", "result": "Search R34 for some porn. Leaving the tags blank will yield random results"},
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
  {"name": "/botwatch", "result": "Get pinged for every major update Flutterbot gets! (@botwatcher, effective in #Flutterbots_changelog)"},
  {"name": "/color", "result": "Get a new color (requires Daily Fapper role)"},
  {"name": "/imtaken", "result": "Mark yourself as being in a relationship"},
  {"name": "/request", "result": "Make a suggestion for improvements to the server. I will give further details when the command is used. Suggestions are logged to <#469557897513271316>."}
];
var admincmds = [
  {"name": "/mute @user", "result": "Mutes a user as punishment"},
  {"name": "/unmute @user", "result": "Unmutes a user"},
  {"name": "/kick @user", "result": "Kicks a user from the server"},
  {"name": "/ban <@user> [reason]", "result": "Bans a user from the server. Talk to Shy about unbanning."},
  {"name": "/info @user", "result": "Displays information about a user. Useful for seeing when accounts were made."},
  {"name": "/announce <r/y/l/b> <title> <content>", "result": "Send an announcement to #announcements, ALL ARGUMENTS REQUIRED. r = red, y = yellow, l = lightblue, b = blue. Blue doesn't tag @everyone."},
  {"name": "/warn <user> <reason>", "result": "Warn a user for breaking rules. REASON IS REQUIRED"},
  {"name": "/clearwarn <user>", "result": "Clear all warnings from a specified user. DO NOT ABUSE THIS COMMAND"},
  {"name": "/viewwarn <user>", "result": "View the warnings given to a specified user. DM response"}
];

var dev = config.devmode;
var YouTube = require('youtube-node');
var youTube = new YouTube();

function evalBooruCmd(input) { // what is this?
  //cleanup
  input = input.replace(/,/g, " "); // replace commas with space (incase someone does tag,tag)
  input = input.replace(/\s+/g, ' ');//replace excess whitespace ("tag  tag" -> "tag tag")
  input = input.trim(); //remove trailing whitespace ("tag tag " -> "tag tag")

  var values = input.split(" ");
  var tags;
  var integerFound = false;
  for (let n in values) {
    if (parseInt(values[n])) {
      //integer found.
      tags = values.splice(0, n);
      //values now has the integer tags has the tags
      integerFound = true //yep we found a integer
    }
  }

  var number;
  if (integerFound) {
    number = parseInt(values[0])
  } else {
    number = 1;
    tags = values //didnt find a integer so "values" only contains tags
  }
  return {"tags": tags, "number": number}
}

// TODO: replace with Math.min and Math.max calls (Gen, what the fuck were you thinking when you told Shy to do it like this?)
function constrain(minimum, maximum, value) {
  if (value > maximum) value = maximum;
  if (value < minimum) value = minimum;
  return value
}

//sorting stuff
function predicatBy(prop) {
  return function (a, b) {
    // Much better way of doing things. Just don't pass strings XD
    return a[prop] - b[prop];
  }
}

/**
 * Sorts the Booru results highest rating first and returns n results
 * @param {JSON} data json data to sort, use image
 * @param {number} num number of results to get
 */
function sortBooru(data, num) {
  var common = [];

  for (let image of data) {
    common.push(image.common)
  }

  //for (image of data) { console.log(image.common) }
  common.sort(predicatBy("score")).reverse();

  //console.log("commonyfied data: ")
  //for (image of common){console.log(image.score)}
  if (common.length > num) {
    var ret = [];
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

function ErrorHandler(err) {
  let date = new Date();
  let dateFormatted = `${("0" + date.getDate()).slice(-2)}-${("0" + date.getMonth()).slice(-2)}-${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}h${("0" + date.getMinutes()).slice(-2)}m${("0" + date.getSeconds()).slice(-2)}s.${("0000" + date.getMilliseconds()).slice(-4)}ms`;
  let errHeader;
  let errBody;

  if (err.name) errHeader = `${err.name} - ${dateFormatted}`; else errHeader = `Error occurred - ${dateFormatted}`;
  if (err.stack) errBody = err.stack; else errBody = JSON.stringify(err);

  let shy = bot.fetchUser("104674953382612992");
  let wolf = bot.fetchUser("204316640735789056");

  // way too overcomplicated work-around for sending messagess
  Promise.all([shy, wolf]).then(users => {
    new Promise((resolve, reject) => {
      let _userId = 0;
      let send = function (user) {
        try {
          user.send({
            embed: {
              title: errHeader,
              description: `\`\`\`xl\n${errBody}\n\`\`\``
            }
          }).then(() => {
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
      };

      send(users[_userId]);
    }).then(() => bot.destroy())
      .then(() => process.exit())
  }).catch(e => {
    console.log("Failed with", e.stack);
  });
}
process.on("unhandledRejection", ErrorHandler);
bot.on("error", ErrorHandler); // perform same actions as unhandledRejection.

process.on("exit", () => {
  let addonList = Object.entries(addons);

  for (let addon of addonList) {
    if (!addon[1]) continue;

    addon[1].kill();
    addons[addon[0]] = undefined;
    addonList[addon[0]] = undefined;
  }
});

// The ready event is fired when the bot begins receiving information from Discord.
// Note to self: when pasting in a comment, don't accidentally delete the handler.
bot.on("ready", () => {
  console.log("Online~");
  suggestionsChannel = bot.channels.get("469557897513271316");
  reactions.upvote = bot.guilds.first().emojis.get("469576069314510858");
  reactions.downvote = bot.guilds.first().emojis.get("469576210368954378");
  setInterval(() => {
    bot.user.setActivity(playingmsg[Math.floor(Math.random() * playingmsg.length)], {type: "PLAYING"})
  }, 1000 * 60 * 60);
  var guld = bot.guilds.first().defaultChannel;

  youTube.setKey(config.ytKey);
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
  });
  ipc.server.start()
});

bot.on("guildMemberAdd", member => {
  member.guild.defaultChannel.send(`Whalecum ${member} to the server! Be sure to read <#249401654003105792> before you post.`);
  member.guild.channels.get("424870218414948367").send("User: " + member.user.username + "\nID: " + member.id + "\nStatus: " + member.presence.status + "\nAccount Created: " + member.user.createdAt + "\nJoined Server: " + member.joinedAt + "\nAvatar URL: " + "<" + member.user.avatarURL + ">" + "\nBot?: " + member.user.bot)
});

bot.on("guildMemberRemove", member => {
  var selmsg = leavemsg[Math.floor(Math.random() * leavemsg.length)];
  var parseleave = selmsg.split("|");
  member.guild.defaultChannel.send(`${parseleave[0]} ${member.displayName} ${parseleave[1]}`);
  member.guild.channels.get("424870218414948367").send("User: " + member.user.username + " Left server at: " + new Date().toUTCString())
});

bot.on("roleDelete", delrole => {
  if (delrole.guild) {
    delrole.guild.defaultChannel.send(`The role "` + delrole.name + `" has been deleted.`)
  }
});

bot.on("channelCreate", createchnl => {
  if (createchnl.guild) {
    createchnl.guild.defaultChannel.send("Created new channel: " + createchnl)
  }
});
bot.on("channelDelete", delchnl => {
  if (delchnl.guild) {
    delchnl.guild.defaultChannel.send("Deleted Channel: " + delchnl.name)
  }
});

bot.on("messageDelete", message => {
  var logchan = message.guild.channels.get("364658410605772802");
  logchan.send({
      embed: {
        author: {
          name: `${message.member.displayName} | ${message.author.tag} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL
        },
        color: message.member.displayColor,
        title: `Message posted ${message.createdAt.toUTCString()} ${message.id}`,
        description: message.cleanContent,
        footer: {
          text: `Deleted from #${message.channel.name} at ${new Date().toUTCString()}`
        }
      }
    }
  )
});

// create an event listener for messages
bot.on('message', async message => {
  if (message.channel.type === "dm") {
    if (message.author.id != config.botID) {
      message.channel.send("DMing commands doesn't work, please use them on the server.")
    }
    return;
  }

  if (/^([\/>!?%$&#=+])/.test(message.content)) {
    const [command, ...args] = message.content.slice(-(message.content.length - "/".length)).split(" ");
    console.log(`{${message.channel.name}}[${message.author.tag}]: ${message.cleanContent}`);
    var logchan = message.guild.channels.get("364658410605772802");
    var announcechan = message.guild.channels.get("250781565817192458");
    logchan.send(`{${message.channel.name}}[${message.author.tag}]: ${message.cleanContent}`);
    if (disabledCommands.includes(command) && ![config.ownerID, "204316640735789056"].includes(message.author.id)) return maintenancemsg(message);
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
          bot.user.setActivity(playingmsg[Math.floor(Math.random() * playingmsg.length)], {type: "PLAYING"});
          message.delete()
        }
        else message.channel.send("Only Shy can play with me...")
      }

      if (command === "HDButt") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/emojis/272396016332832768.png"]}).then(m => m.channel.stopTyping())
      }

      if (command.split(' ').indexOf("ava") == 0) {
        var targetuser = message.mentions.users.first();
        if (targetuser) {
          message.channel.send(targetuser.displayAvatarURL)
        }
        else (message.channel.send("ERROR: You need to define someone..."))
      }

      if (command.split(' ').indexOf("setgame") == 0) {
        if (message.author.id == config.ownerID) {
          bot.user.setActivity(args.join(" "), {type: "PLAYING"});
          message.delete()
        }
        else {
          message.channel.send(message.author + ", only Shy can play with me =(")
        }

      }

      if (["commands", "help"].includes(command)) {
        let [, num] = message.content.split(" ");
        let pagenum = parseInt(num || 1, 10);
        var data = new Discord.RichEmbed();
        data.setColor("#191970");
        data.setTitle("COMMANDS");
        console.log(pagenum === 1 ? 0 : pagenum * 25);
        console.log(pagenum === 1 ? 24 : ((pagenum + 1) * 25) - 1);
        let commandsLocal = commands.slice(pagenum === 1 ? 0 : (pagenum - 1) * 25, pagenum === 1 ? 24 : (pagenum * 25) - 1);
        for (let cmd of commandsLocal) {
          data.addField(cmd.name, cmd.result)
        }
        message.author.send(`Page ${pagenum} of 2`, {embed: data});
        message.delete();
        if (message.member.roles.has(config.adminID)) {
          var data = new Discord.RichEmbed();
          data.setColor("#FF0000");
          data.setTitle("ADMIN COMMANDS");
          for (let cmd of admincmds) {
            data.addField(cmd.name, cmd.result)
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
        if (message.author.id == config.ownerID || message.member.roles.has(config.adminID)) {
          var target = args.join(" ");
          var targetuser = message.mentions.users.first();
          if (targetuser) {
            await message.guild.member(targetuser).addRole("249616536573050900");
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
        if (message.author.id == config.ownerID || message.member.roles.has(config.adminID)) {
          var target = args.join(" ");
          var targetuser = message.mentions.users.first();
          if (targetuser) {
            await message.guild.member(targetuser).removeRole("249616536573050900");
            message.channel.send(target + " is no longer being gagged!");
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
          var targetuser = message.mentions.users.first();
          if (targetuser) {
            message.guild.member(targetuser).kick();
            message.channel.send(targetuser.username + " has been kicked in the ass..");
            message.delete()
          }
          else message.channel.send("ERROR: You need to define someone...")
        }
        else message.channel.send("Does it look like you're an admin?")
      }

      else if (command.split(" ").indexOf("ban") == 0) {
        if (message.member.roles.has(config.adminID)) {
          let [, user, ...reason] = message.content.split(" ");
          let un = message.mentions.users.first();
          reason = reason || [];
          reason = reason.join(" ");
          let guildMember = (message.mentions.members.size) ?
            message.mentions.members.first() : message.guild.member(user);
          if (guildMember) {

            message.channel.send(`${un.tag} has been banned by ${message.author} for ${reason};`).then(guildMember.ban(`${message.author.tag}: ${reason}`));
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
        console.log(message.guild.roles.entries());
        message.channel.send("Logging Role Data...")
      }
      if (command === "loli") {
        message.channel.startTyping();
        message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/270372438825500672/281941724539125760/17_-_1_2.png"]}).then(m => m.channel.stopTyping())
      }
      else if (command.split(" ").indexOf("say") == 0) {
        if (message.author.id == config.ownerID) {
          message.channel.send(args.join(" "));
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
        message.channel.send(message.author + "'s Roles:");
        message.channel.send(message.guild.member(message.author).roles.array().map(role => role.name.replace("@everyone", "")))
      }
      if (command === "loop") {
        if (message.author.id == config.ownerID || message.author.id == config.botID) {
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
          message.guild.createRole({name: args.join(" ")});
          message.channel.send(`A new role "` + args.join(" ") + `" has been created.`);
          message.delete()
        }
        else (message.channel.send("Does it look like you're an admin?"))
      }
      else if (command.split(' ').indexOf("adminify") == 0) {
        if (message.author.id == config.ownerID) {
          var target = args.join(" ");
          var targetuser = message.mentions.users.first();
          if (targetuser) {
            message.guild.member(targetuser).addRole(config.adminID);
            message.channel.send(target + " has become an admin!");
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
          var targetuser = message.mentions.users.first();
          if (targetuser) {
            message.channel.send("User: " + targetuser.username + "\nID: " + targetuser.id + "\nStatus: " + targetuser.presence.status + "\nAccount Created: " + targetuser.createdAt + "\nJoined Server: " + message.guild.member(targetuser).joinedAt + "\nAvatar URL: " + "<" + targetuser.avatarURL + ">" + "\nBot?: " + targetuser.bot)
          }
        } else message.channel.send("Do you look like an Admin?")
      }
      if (command === "serverinfo") {
        message.channel.send(`Name: ${message.guild.name}\n`
          + `Owner: ${message.guild.owner}\n`
          + `ID: ${message.guild.id}\n`
          + `Members: ${message.guild.memberCount}\n`
          + `Icon URL: <${message.guild.iconURL}>\n`
          + `Created: ${message.guild.createdAt}\n`
          + `Features: ${message.guild.features}\n`
          + `Region: ${message.guild.region}\n`
          + `Thanks to GeneralUltra758 for teaching me how to bot.`);
      }

//      if (command === "spin") {
//        if (__user.gem < 100) return message.channel.send("ERROR: You don't have enough gems to play slots..")
//        __user.gem -= 100
//        var slot1 = Math.ceil(Math.random() * 9),
//          slot2 = Math.ceil(Math.random() * 9),
//          slot3 = Math.ceil(Math.random() * 9),
//          winningAmount = 0,
//          losingAmount = 0,
//          canWin = true,
//          halfScore = false,
//          jackpot = 10000,
//          symbol = ["fuck", ":full_moon:", ":gem:", ":star:", ":dragon_face:", ":bat:", ":diamond_shape_with_a_dot_inside:", ":gun:", ":sunny:", ":no_entry_sign:"]
//        // loss scenarios
//        if ([slot1, slot2, slot3].includes(4)) canWin = false;
//        if ([slot1, slot2, slot3].includes(5)) halfScore = true
//        if (slot1 === slot2 && slot2 === slot3 && slot1 === 4) losingAmount = 1000;
//
//        // win scenarios
//        if (slot1 === 2) winningAmount += 100
//        if (slot2 === 2) winningAmount += 100
//        if (slot3 === 2) winningAmount += 100
//
//        // minor jackpot scenarios
//        if (slot1 === 6) winningAmount += 300;
//        if (slot2 === 6) winningAmount += 300;
//        if (slot3 === 6) winningAmount += 300;
//
//        // major jackpot scenario
//        if (slot1 === slot2 && slot2 === slot3 && slot1 === 6) winningAmount = jackpot;
//
//        if (canWin) {
//          if (halfScore === true) winningAmount /= 2
//          message.channel.send(`${symbol[slot1]}${symbol[slot2]}${symbol[slot3]} \nYou've earned ${winningAmount} Gems!`)
//          __user.gem += winningAmount
//        }
//        else {
//          message.channel.send(`${symbol[slot1]}${symbol[slot2]}${symbol[slot3]} \n You lost ${losingAmount} Gems...`)
//          __user.gem -= losingAmount
//        }
//      }

      if (command === "kill") {
        if (message.author.id == config.ownerID) {
          message.channel.send("Shutting down addons...")
            .then(() => ipc.server.broadcast("shutdown", message.channel.id))
            .then(() => message.channel.send("Shutting down..."))
            .then(() => bot.destroy())
            .then(() => process.exit())
        }
        else message.channel.send("Only Shy has permission to kill me...")
      }

      if (command == "cat") {
        message.channel.send("http://thecatapi.com/api/images/get?format=src&type=gif&timestamp=" + Math.floor(Math.random() * 9999999999999))
      }

      else if (command.split(' ').indexOf("deadminify") == 0) {
        if (message.author.id == config.ownerID) {
          var target = args.join(" ");
          var targetuser = message.mentions.users.first();
          if (targetuser) {
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).removeRole(config.adminID);
            message.channel.send(target + " is no longer admin...");
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
            var video = result;
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
        var cmd = args.join(" ");
        var eval = evalBooruCmd(cmd);
        booru.search("r34", eval.tags, {limit: 5, random: true})
          .then(images => {
            var sorted = sortBooru(images, constrain(1, 5, eval.number));
            for (let image of sorted) {
              message.channel.send(`\`Rating: ${image.common.rating}\` \n\`Score: ${image.common.score}\` \nhttps:${image.common.file_url}`)
            }
          })
      }

      if (command.split(" ").indexOf("r34") == 0) {
        var cmd = args.join(" ");
        var eval = evalBooruCmd(cmd);
        message.channel.startTyping();
        booru.search("r34", eval.tags, {
          limit: constrain(1, 5, eval.number),
          random: true
        })
        .then(images => {
          for (let image of images) {
            message.channel.send(`\`Rating: ${image.common.rating}\` \n\`Score: ${image.common.score}\` \n${image.common.file_url}`)
          }
          message.channel.stopTyping()
        }).catch(() => {
          message.channel.send(`No images found.`).then(() => message.channel.stopTyping())
        });
      }

      if (command.split(" ").indexOf("roles") == 0) {
        var targetuser = message.mentions.users.first();
        if (targetuser) {
          message.channel.send(targetuser.username + "'s Roles:");
          message.channel.send(message.guild.member(targetuser).roles.array().map(role => role.name.replace("@everyone", "")))
        }
        else message.channel.send("ERROR: You need to define someone...")
      }

      if (command.split(" ").indexOf("e6") == 0) {
        var cmd = args.join(" ");
        var eval = evalBooruCmd(cmd);
        message.channel.startTyping();
        booru.search("e6", eval.tags, {
          limit: constrain(1, 5, eval.number),
          random: true
        }).then(images => {
          for (let image of images) {
            message.channel.send(`\`Rating: ${image.common.rating}\` \n\`Score: ${image.common.score}\` \n${image.common.file_url}`)
          }
          message.channel.stopTyping()
        }).catch(() => {
          message.channel.send(`No images found.`).then(() => message.channel.stopTyping())
        });
      }

      if (command.split(" ").indexOf("db") == 0) {
        var cmd = args.join(" ");
        var eval = evalBooruCmd(cmd);
        message.channel.startTyping();
        booru.search("dp", eval.tags, {
          limit: constrain(1, 5, eval.number),
          random: true
        })
        .then(images => {
          for (let image of images) {
            message.channel.send(`\`Rating: ${image.common.rating}\` \n\`Score: ${image.common.score}\` \n${image.common.file_url}`)
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
          message.guild.member(message.author).setNickname(args.join(" "));
          message.channel.send(message.author.username + ", your name has been set")
        }
      }

      if (command.split(" ").indexOf("purge") == 0) {
        if (message.member.roles.has(config.adminID)) {
          message.delete();
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
          var announcechan = message.guild.channels.get("250781565817192458");
          let [, color, title, ...text] = message.cleanContent.split(" ");
          if (color === "r") {
            var hex = "ff0000";
            var tagall = true;
            var bool = "Color - Red"
          }
          if (color === "y") {
            var hex = "ffff00";
            var tagall = true;
            var bool = "Color = Yellow"
          }
          if (color === "b") {
            var hex = "0000ff";
            var tagall = false;
            var bool = "Color - Blue"
          }
          if (color === "l") {
            var hex = "a7a7ff";
            var tagall = true;
            var bool = "Color - Light Blue"
          }
          if (tagall === true) {
            announcechan.send("@everyone")
          }
          announcechan.send({embed: new Discord.RichEmbed().setAuthor(`Author: ${message.member.displayName} | ${message.author.tag}`).setColor(hex).setTitle(`Title: ${title}`).setDescription(text.join(" ")).setTimestamp(new Date())});
          announcechan.send(`\`\`\`${title} | ${bool} | ${message.member.displayName} / ${message.author.tag} \n ${text.join(" ")}\`\`\``).then(() => message.delete())
        }
        else {
          message.channel.send("Does it look like you're an admin?")
        }
      }

      if (command === "flip") {
        var coinside = Math.floor(Math.random() * 2);
        if (coinside === 0) {
          //heads
          var sidename = "heads";
          var sideimg = "https://cdn.discordapp.com/attachments/249311166776606721/382040020409909248/coin_heads.png"
        }
        else {
          //tails
          var sidename = "tails";
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
          let [path, ...filename] = args.split("/");
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
            message.guild.channels.get("382608948378730496").send("<@&380371674647756800>");
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

      if (command === "imtaken") {
        if (!message.guild.member(message.author).roles.has("431145333867675659")) {
          message.guild.member(message.author).addRole("431145333867675659").then(() => message.channel.send(`No touchy, ${message.author} is in a relationship~`))
        }
        else {
          message.guild.member(message.author).removeRole("431145333867675659").then(() => message.channel.send(`${message.author} is now a single pringle...`))
        }
      }

      if (command === "stats") {
        let stack = [];

        if (!message.mentions.users.size) {
          message.mentions.users.set(message.author.id, message.author);
        }

        if (message.mentions.users.size > 3) {
          return message.reply("You may only select up to three people.");
        }

        /**
         * @param {User} _user
         * @return {Function}
         */
        function get_user(_user) {
          let [userId, user] = _user;

          return function(callback) {
            User.findOne({userId}, "lvl exp nxtlvl gem inv rewardChain lastReward", function handle(err, result) {
              if (err) {
                callback({err, user:user.tag});
              }

              if (result) {
                let embed;

                try {
                  embed = {
                    embed: {
                      color: message.guild.member(userId).displayColor,
                      title: `${message.guild.member(userId).user.tag}'s Stats:`,
                      description: `Level: ${result.lvl}\n`
                      + `EXP/Next LVL: ${result.exp}/${result.nxtlvl}\n`
                      + `Gems: ${result.gem}\n`
                      + `Inventory: ${result.inv}\n`
                      + `Current Chain: ${result.rewardChain}\n`
                      + `Last Reward: ${result.lastReward.toUTCString()}`,
                      thumbnail: {url: message.guild.member(userId).user.avatarURL},
                      footer: {text: `Executed by: ${message.author.tag}`, iconURL: message.author.avatarURL}
                    }
                  }
                } catch (err) {
                  return callback({err, user:user.tag});
                }

                return callback(null, embed);
              }

              User.create({userId}, handle);
            });
          };
        }

        function send(embeds) {
          let embed = embeds.pop();

          if (!embed) return;

          message.channel.send(embed).then(() => send(embeds));
        }

        for (let user of message.mentions.users) {
          stack.push(get_user(user));
        }

        async.series(stack, function(err, results) {
          if (err) {
            console.error(err.err);
            return message.reply("There was an unknown error when attempting to retrieve the "
              + "user " + err.user + ". Please wait for confirmation that the problem has been "
              + "solved, and then try again.");
          }

          message.reply("Here are your requested users:").then(() => {
            send(results.reverse());
          });
        });
      }

//      if (command === "reward") {
//        let currentDate = new Date();
//        let lastActivationDate = __user.lastReward.getTime();
//        let day = (24 * 60 * 60 * 1000);
//        let timeRemaining = new Date((__user.lastReward.getTime()+day) - Date.now());
//console.log(timeRemaining)
//        let hours = timeRemaining.getUTCHours();
//        let minutes = timeRemaining.getUTCMinutes();
//        let seconds = timeRemaining.getUTCSeconds();
//
//        let daysSinceLastReward = (currentDate - lastActivationDate) / day;
//
//        if (daysSinceLastReward >= 1) {
//          if (daysSinceLastReward >= 2) __user.rewardChain = 0;
//
//          ++__user.rewardChain;
//          var gemsEarned = (255*__user.rewardChain)
//          var expEarned = Math.ceil(Math.random() * 50)
//          __user.exp += expEarned;
//          __user.gem += gemsEarned;
//          __user.lastReward = new Date();
//          __user.markModified("lastReward");
//          message.channel.send(`You've earned your daily reward!\n EXP + ${expEarned}, Gems + ${gemsEarned}`);
//        } else {
//          message.channel.send(`You need to wait ${hours} hour${hours!==1? "s" : ""}, ${minutes} minute${minutes!==1? "s" : ""}, and ${seconds} second${seconds!==1? "s" : ""} to use this command again.`);
//        }
//      }

      if (command === "givexp") {
        if (!message.member.roles.has(config.adminID)) {
          return;
        }

        let [, , val] = message.content.split(" ");
        var target = message.mentions.users.first();

        if (!target) return message.channel.send("You need to specify who you would like to give gems to.");

        function then() {
          message.reply(`I have given ${val} EXP to ${target}.`).then(m => m.delete(5000));
        }

        function error(err) {
          message.reply("I could not complete your request due to an unknown error. Please wait for confirmation that the problem"
            + " has been solved, and then try again.");

          console.log(err);
        }

        User.findOneAndUpdate({userId: target.id},
          {$inc: {exp: parseInt(val, 10)}},
          {"upsert": true, "setDefaultsOnInsert": true}).then(then, error);
      }

      if (command === "givegems") {
        if (!message.member.roles.has(config.adminID)) {
          return;
        }

        let [, , val] = message.content.split(" ");
        var target = message.mentions.users.first();

        if (!target) return message.channel.send("You need to specify who you would like to give gems to.");

        function then() {
          message.reply(`I have given :gem:${val} to ${target}.`).then(m => m.delete(5000));
        }

        function error(err) {
          message.reply("I could not complete your request due to an unknown error. Please wait for confirmation that the problem"
            + " has been solved, and then try again.");

          console.log(err);
        }

        User.findOneAndUpdate({userId: target.id},
          {$inc: {gem: parseInt(val, 10)}},
          {"upsert": true, "setDefaultsOnInsert": true}).then(then, error);
      }

      if (command === "dmuser") {
        if (message.member.roles.has(config.adminID)) {
          let [, , ...msg] = message.content.split(" ");
          var targetuser = message.mentions.users.first();
          if (!targetuser) return message.channel.send("ERROR: You need to define someone...");
          targetuser.send(`${msg.join(" ")} - sent by ${message.author.tag}`);
          message.delete()
        }
        else {
          message.channel.send("Does it look like you're an admin?")
        }
      }

      if (command === "tradegems") {
        let [, value] = message.content.split(" ");
        var target_user = message.mentions.users.first();
        value = parseInt(value, 10);
        if (!target_user) return message.channel.send("ERROR: You need to define someone...");
        if (value !== value || value <= 0) return message.channel.send("ERROR: You need to give a real number of gems, negatives aren't allowed.");

        User.findOne({userId:message.author.id}, {userId:1, gem:1}, function handle(err, result) {
          const trade = Fawn.Task();

          if (err) {
            console.log(err);
            return message.reply("There was an unknown error when attempting to transfer gems. "
              + "Please wait for confirmation that the problem has been solved, "
              + "and then try again.");
          }

          if (result) {
            if (result.gem - value < 0) return message.reply("You do not have enough gems! "
              + `(Current: ${result.gem}, required: ${value} or more.)`)
              .then(m => m.delete(5000));

            message.reply("Transferring :gem:" + value + " to " + target_user.tag)
              .then(m => m.delete(5000));

            function then() {
              message.reply("Successfully transferred :gem:" + value + " to " + target_user.tag + "!")
                .then(m => m.delete(5000))
                .then(() => message.delete());
            }

            function error(err) {
              console.log(err);
              return message.reply("There was an unknown error when attempting to transfer gems. "
                + "Please wait for confirmation that the problem has been solved, "
                + "and then try again.")
                .then(m => m.delete(5000))
                .then(() => message.delete());
            }

            return trade.update(User, {userId:result.userId}, {$inc: {gem:-value}})
              .update(User, {userId:target_user.id}, {$inc: {gem:value}})
              .run({"useMongoose": true})
              .then(then, error);
          }

          User.create({userId:message.author.id}, handle);
        });
      }

      if (command === "color" || command === "colour") {
        let [, ...color] = message.content.split(" ");
        var rolename = `color - ${args.join(" ")}`,
          role;
        var currentRole;

        if (message.member.roles.has("403126021500567552")) {

          if (role = message.guild.roles.findKey("name", rolename)) {
            while (currentRole = message.member.roles.find(role => role.name.startsWith("color - "))) {
              await message.member.removeRole(currentRole)
            }
            message.guild.member(message.author.id).addRole(role).then(() => {
              message.channel.send(`Gave you the color ${color.join(" ")}`)
            })
          }

          else {
            message.channel.send("That color doesn't exist, makes sure you spelled it correctly, or ask Shy or an admin to create it")
          }
        }
        else {
          message.channel.send('You need the "Daily Fapper" role to use this command')
        }
      }


      if (command === "removecolor") {
        let [, ...color] = message.content.split(" ");
        var rolename = `color - ${args.join(" ").toLowerCase()}`,
          role;
        if (message.member.roles.has("403126021500567552")) {
          if (role = message.guild.roles.findKey("name", rolename)) {
            if (message.member.roles.has(role)) {
              message.guild.member(message.author.id).removeRole(role).then(() => {
                message.channel.send(`Removed the color ${color.join(" ")}`)
              })
            }
            else {
              message.channel.send("You don't have that color")
            }
          }
          else {
            message.channel.send("That color doesn't exist, makes sure you spelled it correctly, or ask Shy or an admin to create it")
          }
        }
        else {
          message.channel.send('You need the "Daily Fapper" role to use this command')
        }
      }

//        if(command === "warn"){
//          let [, target, ...reason] = message.content.split(" ")
//              reason = reason.join(" ")
//          if (message.member.roles.has(config.adminID)){
//            if (message.mentions.users.size){
//              var targetuser = message.mentions.users.first().id
//              if (reason){
//                if (!(targetuser = await User.findOne({userId:targetuser}))) {
//                  targetuser = await User.create({userId: targetuser});
//                }
//
//                await User.findByIdAndUpdate(targetuser._id, {$push:{warnings:{issuer: message.author.id, reason, date:new Date()}}}).then(() => {
//                  message.channel.send(`${target}, you've been warned for \`${reason}\`. You currently have \`${targetuser.warnings.length + 1}\` total warnings.`)
//                  message.delete()
//                })
//              }
//              else message.channel.send("ERROR: You need to provide a reason for warning this user.")
//            }
//            else message.channel.send("ERROR: You need to define someone.")
//          }
//          else message.channel.send("Does it look like you're an admin?")
//        }


//        if (command === "viewwarn"){
//          if (message.member.roles.has(config.adminID)){
//            if (message.mentions.users.size){
//              var targetuser = message.mentions.users.first().id
//              var user = message.mentions.users.first().tag
//                if (targetuser = await User.findOne({userId:targetuser})){
//                  if (targetuser.warnings.length){
//                    var stack = []
//                    for (let i = 0; i < targetuser.warnings.length; ++i){
//                      stack.push(function (callback){
//                        bot.fetchUser(targetuser.warnings[i].issuer).then(user => callback(null, user.tag), err => callback(err))
//                      })
//                    }
//
//                    async.series(stack, function(err, userIDs){
//                      if (err){
//                        message.channel.send("ERROR: Unknown")
//                        return console.error(err.stack)
//                      }
//
//                      var msg = []
//                      targetuser.warnings.forEach((warning, index) => {
//                        msg.push(`Issued by: ${userIDs[index]}\nReason: ${warning.reason}\nDate: ${warning.date},\n`)
//                      })
//                      message.author.send(`Warnings for ${user}`)
//                      message.author.send(msg)
//                      message.delete()
//                    })
//                  }
//                  else message.channel.send("This user has no recorded warnings.")
//                }
//                else message.channel.send("ERROR: That user isn't in the database yet. Make sure they've sent at least one non-command message.")
//            }
//            else message.channel.send("ERROR: You need to define someone")
//          }
//          else message.channel.send("Does it look like you're an admin?")
//        }

//        if (command === "clearwarn"){
//          let [, user] = message.content.split(" ")
//          if (message.member.roles.has(config.adminID)){
//            if (message.mentions.users.size){
//              var targetuser = message.mentions.users.first().id
//              if (targetuser = await User.findOne({userId:targetuser})){
//                targetuser.warnings = []
//                targetuser.markModified("warnings")
//                targetuser.save()
//                message.channel.send(`Cleared the warnings for ${message.guild.member(targetuser.userId).user.tag}`)
//                message.delete()
//              }
//            }
//          }
//          else (message.channel.send("Does it look like you're an admin?"))
//        }

//        if (command === "lb" || command === "leaderboard" || command === "top10"){
//          let [ cmd, sort] = message.content.split(" ")
//              sort = (sort === "gems") ? "gem" : sort
//              sort = (["level", "levels", "lvl"].includes(sort)) ? "lvl" : sort
//
//              if (!["exp", "gem", "lvl"].includes(sort)) return message.channel.send("You can only sort by `exp`, `lvl`, and `gems`.")
//              const result = await User.find({}, `userId ${sort}`, {sort:{[sort]:-1}, limit:10})
//
//              let stack = [];
//              result.map(r => stack.push(callback => {
//                bot.fetchUser(r.userId).then(user => callback(null, {user:user.tag, result:r[sort]}), err => callback(err));
//              }));
//
//              async.series(stack, function(err, result) {
//                if (err) {
//                  message.channel.send("ERROR: Unknown");
//                  console.error(err.stack);
//                }
//
//                let msg = []
//                msg.push("```")
//                result.forEach((userId, index) => {
//                  msg.push(`${index + 1}. ${userId.user} | ${sort} ${userId.result}`)
//                })
//                msg.push("```")
//                message.author.send(`Sorted by ${sort}`)
//                message.author.send(msg)
//                message.delete()
//              });
//        	}

      if (command === "newcmd") {
        if (message.author.id != config.ownerID) return message.channel.send("ERROR: Only the owner can use this command.");
        let [, syn, ...desc] = args.join(" ").split(",");
        announcechan.send("@everyone NEW COMMAND");
        announcechan.send({
          embed: {
            title: `New Command: /${cmd}`,
            description: desc.join(","),
            footer: {
              text: `Syntax: ${syn}`
            }
          }
        });
        message.delete()
      }

      if (command === "dblookup"){
        let [, target] = message.content.split(" ");

        if (target) {
          User.findOne({userId:target}, "lvl exp nxtlvl gem inv rewardChain lastReward", function handle(err, result) {
            if (err) {
              console.log(err);
              return message.reply("There was an unknown error when attempting to retrieve the "
                + "user. Please wait for confirmation that the problem has been "
                + "solved, and then try again.");
            }

            if (result) {
              return message.channel.send({
                embed: {
                  color: message.member.displayColor,
                  title: `Stats for ${target}:`,
                  description: `Level: ${result.lvl}\n`
                    + `EXP/Next LVL: ${result.exp}/${result.nxtlvl}\n`
                    + `Gems: ${result.gem}\n`
                    + `Inventory: ${result.inv}\n`
                    + `Current Chain: ${result.rewardChain}\n`
                    + `Last Reward: ${result.lastReward.toUTCString()}`,
                  footer: {text: `Executed by: ${message.author.tag}`, iconURL: message.author.avatarURL}
                }
              });
            }

            message.reply("This user ID was not found in the database.");
          });
        }
        else message.channel.send("ERROR: You need to define an ID")
      }

      if (command === "msay") {
        let [, ...msg] = message.content.split(" ");
        ipc.server.broadcast("music.say", msg.join(" "))
      }

      if (command === "play") {
        let [, ...query] = message.content.split(" ");
        ipc.server.broadcast("music.play", {
          q: query.join(" "),
          channel_id: message.channel.id
        })
      }

      if (command === "stop") {
        ipc.server.broadcast("music.stop", "dummy")
      }

      if (command === "request") {
        let requestCollector; // create a reference we can use later on

        const RequestCommand = {
          // data
          confirmCollector: null,
          collection: null,

          // functions
          messageFilter: function messageFilter(capturedMessage) {
            if (message.author.id !== capturedMessage.author.id) return false;
            return capturedMessage.content.startsWith("--");

          },

          collectorCallback: function collectorCallback(collection, endCode) {
            console.log("Collection ended with reason:", endCode);

            switch (endCode) {
              case "SUGGESTION_END":
                RequestCommand.confirmSuggestionIsComplete(collection);
                break;
              default:
                message.channel.send("An unknown error occurred. Please re-use `/request` and try again.")
            }
          },

          collectedMessage: function collectedMessage(capturedMessage) {
            console.log(`Collected message with content "${capturedMessage.cleanContent}".`);
            if ((/end\.?$/i).test(capturedMessage.content)) RequestCommand.endCollector("SUGGESTION_END");
          },

          endCollector: function endCollector(reason) {
            requestCollector.stop(reason);
          },

          confirmSuggestionIsComplete: function confirmSuggestionIsComplete(collection) {
            RequestCommand.collection = collection;

            message.author.send("Here is the content of your request:").then(({channel}) => {
              let series = [];
              let index = 0;

              for (let currentMessage of collection.values()) {
                if (/^-- *end\.?$/i.test(currentMessage.content)) continue;

                index = index + 1;
                // noinspection JSUnusedLocalSymbols
                let cIndex = index;

                series.push(function sendMessage(callback) {
                  channel.send({
                    embed: {
                      author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL
                      },
                      description: currentMessage.cleanContent.replace(/^-- */, ""),
                      timestamp: currentMessage.createdAt
                    }
                  }).then(embed => callback(null, embed), err => callback(err));
                });
              }

              return new Promise((resolve, reject) => {
                async.series(series, function callback(err, messages) {
                  if (err) reject(err);

                  resolve(channel, messages);
                });
              });
            }).then(channel => {
              return channel.send(["Is this suggestion correct and final? (`yes` or `no`)", "You have thirty seconds to respond, or `yes` will be assumed."]);
            }).then(({channel}) => {
              return RequestCommand.confirmCollector = channel.createMessageCollector(RequestCommand.confirmFilter, {time: 30000});
            }).then(collector => {
              collector.on("collect", RequestCommand.gotConfirmationMessage);
            }).catch(function postError(err) {
              console.error(err);
              message.reply("I was unable to send (or continue to send) confirmation to your DMs for an unknown reason. You blocked me, didn't you?");
            });
          },

          confirmFilter: function confirmFilter(message) {
            return ["yes", "no"].includes(message.content.trim().toLowerCase());
          },

          gotConfirmationMessage: function gotConfirmationMessage(capturedMessage) {
            let content = capturedMessage.content.trim().toLowerCase();
            RequestCommand.confirmCollector.stop(content);

            switch (content) {
              case "no":
                capturedMessage.reply("Very well. Please edit your suggestion as you wish, then re-use /request in the server to re-submit it.");
                break;
              case "yes":
              default: // in case something slipped through;
                RequestCommand.postRequest();
            }
          },

          postRequest: function postRequest() {
            let series = [];
            let index = 0;

            for (let currentMessage of RequestCommand.collection.values()) {
              if (/^-- *end\.?$/i.test(currentMessage.content)) continue;

              index = index + 1;
              // noinspection JSUnusedLocalSymbols
              let cIndex = index;

              series.push(function sendMessage(callback) {
                suggestionsChannel.send({
                  embed: {
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL
                    },
                    description: currentMessage.cleanContent.replace(/^-- */, ""),
                    timestamp: currentMessage.createdAt
                  }
                }).then(embed => callback(null, embed), err => callback(err));
              });
            }

            new Promise((resolve, reject) => {
              async.series(series, function callback(err, messages) {
                if (err) reject(err);

                resolve(messages);
              });
            }).then(messages => messages.pop().react(reactions.upvote))
              .then(reaction => reaction.message.react(reactions.downvote))
          }
        };

        message.reply(["I am now listening for your suggestion. Please add `--` to the start of any message you wish for me to include in the suggestion content, and say `--end` to end the suggestion. I will then ask if you wish to add anything else before I add it.", "Suggestions are limited to a maximum of 10,000 characters."]).then(() => {
          requestCollector = message.channel.createMessageCollector(RequestCommand.messageFilter, /*{time:2000}*/); // write to the created reference
          requestCollector.on("collect", RequestCommand.collectedMessage);
          requestCollector.on("end", RequestCommand.collectorCallback);
        });
      }


//        if (command === "colorlist"){
//          if (message.member.roles.has("403126021500567552")){
//            let list = []
//            const colors = await (message.guild.roles.findKey("name", message.guild.roles.startsWith("color - "))
//              colors.forEach((color, index) => {
//                list.push(colors)
//          }
//        }

      // what is this brace, and why is it needed?
    }

  }

  //These do not need "/" to function
  else {
    User.findOneAndUpdate({userId: message.author.id},
      {$inc: {exp: Math.floor(Math.random() * 15)}},
      {"upsert": true, "setDefaultsOnInsert": true, "new": true})
      .then(...bindUpdateCallback(message));

    console.log("[" + message.channel.name + "] " + message.author.tag + "> " + message.content);

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
  }
});

if (config.devmode) { // is this even needed still? -Zuris
  ipc.serveNet()
} else {
  ipc.serve()
}

ipc.server.on("start", () => {
  addons.music = child_process.spawn("node", ["./addons/music.js"], ["ignore", process.stdout, process.stderr])
});

// Roll back all incomplete transactions before starting the bot
roller.roll().then(() => bot.login(config.botToken));
