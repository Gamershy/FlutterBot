﻿const Discord = require('discord.js')
if (!Discord.Guild.prototype.hasOwnProperty("defaultChannel")){
Object.defineProperty(Discord.Guild.prototype, "defaultChannel", {
  get: function () {
    delete this.defaultChannel;
    return this.defaultChannel = this.channels.get("249311166776606721");
  }
})};
const config = require('./config.js')
const bot = new Discord.Client()
const readline = require("readline")
const booru = require("booru")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
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
    "These messages appear whenever you say the word 'porn'"
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
    "with a gloryhole"
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
    "Pongping."
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
    "/stop",
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
    {"name":"/ping" , "result":"See how fast she responds."},
    {"name":"/HDButt" , "result":"Butts in HD ;3"},
    {"name":"/ava @user" , "result":"Displays a user's avatar"},
    {"name":"/kys" , "result":"Find a portal to a magical land~"},
    {"name":"/loli" , "result":"I swear it's a loli!"},
    {"name":"/hug" , "result":"Give everyone a big ol' hug"},
    {"name":"/myroles" , "result":"Displays your roles for everyone to see."},
    {"name":"/roles @user" , "result":"Displays a user's roles."},
    {"name":"/boop" , "result":"BOOP!!"},
    {"name":"/owo" , "result":"What's this? owo"},
    {"name":"/spin" , "result":"It'll be done soon™"},
    {"name":"/cat" , "result":"Meow~"},
    {"name":"/kawaiipuss" , "result":"See some sexy pussy"},
    {"name":"/yt <query>" , "result":"Search youtube for a video"},
    {"name":"/r34 <Tags> [Number]" , "result":"Search R34 for some porn. Leaving the tags blank will yield random results"},
    {"name":"/r34top <Tags> [Number]" , "result": "Search R34 for the top scored porn."},
    {"name":"/gudbat" , "result":"Good bat~"},
    {"name":"/loodbat" , "result":"Lewd Bat."},
    {"name":"/sendnoods" , "result":"You heard the pony, send em"},
    {"name":"/nickname" , "result":"set your nickname. (Made for mobile, usable by pc.)"},
    {"name":"/imagination" , "result":"Go on, use it!"}

]
var admincmds = [
    {"name":"/mute @user" , "result":"Mutes a user as punishment"},
    {"name":"/unmute @user" , "result":"Unmutes a user"},
    {"name":"/kick @user" , "result":"Kicks a user from the server"},
    {"name":"/ban <@user> [reason]" , "result":"Bans a user from the server. Talk to Shy about unbanning."},
    {"name":"/info @user" , "result":"Displays information about a user. Useful for seeing when accounts were made."}
]
var dev = false
var YouTube = require('youtube-node')
  var youTube = new YouTube()
  function evalBooruCmd(input){
    //cleanup
    input = input.replace(/,/g , " ") // replace commas with space (incase someone does tag,tag)
    input = input.replace(/\s+/g, ' ')//replace excess whitespace ("tag  tag" -> "tag tag")
    input = input.trim() //remove trailing whitespace ("tag tag " -> "tag tag")

    var values = input.split(" ")
    var tags
    var integerFound = false
    for(n in values){
        if(parseInt(values[n])){
            //integer found.
            tags = values.splice(0,n)
            //values now has the integer tags has the tags
            integerFound = true //yep we found a integer
        }
    }

    var number
    if (integerFound){
        number = parseInt(values[0])
    } else{
        number = 1
        tags = values //didnt find a integer so "values" only contains tags
    }
    return {"tags": tags, "number":number}
}
    function constrain(minimum, maximum, value){
    if(value > maximum) value = maximum
    if(value < minimum) value = minimum
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
function sortBooru(data, num){
    var common = []
    for (image of data) { common.push(image.common) }
    //for (image of data) { console.log(image.common) }
    common.sort(predicatBy("score")).reverse()
    //console.log("commonyfied data: ")
    //for (image of common){console.log(image.score)}
    if (common.length>num){
        var ret = []
        for (var n = 0; n <num; n++){
            ret.push(common[n])
        }
    return ret
    }
    return common
}
function delayedDelete(msg){
    setTimeout((msgtodelete)=>
        {msgtodelete.delete()},5000,msg);
}
process.on("uncaughtException", err => {
  let date = new Date();
  let dateFormatted = `${("0"+date.getDate()).slice(-2)}-${("0"+date.getMonth()).slice(-2)}-${date.getFullYear()} ${("0"+date.getHours()).slice(-2)}h${("0"+date.getMinutes()).slice(-2)}m${("0"+date.getSeconds()).slice(-2)}s.${("0000"+date.getMilliseconds()).slice(-4)}ms`;
  let header = `${err.name} - ${dateFormatted}`;
  bot.fetchUser("104674953382612992").then(user => {
    user.send({embed:{title:header, description:`\`\`\`xl\n${err.stack}\n\`\`\``}}).then(() => bot.destroy());
  })
});
/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log("Online~")
  var timer = setInterval(()=>{bot.user.setGame(playingmsg[Math.floor(Math.random()*playingmsg.length)])},1000*60*60)
  var guld = bot.guilds.first().defaultChannel

  youTube.setKey(config.ytKey)
  if (dev == true){
      guld.send("Dev Build (1.7.0.1)")
  }
  else {
    guld.send("I am now online~")
  }
  rl.on("line", input =>{
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
            pings.push({username:parsed[3], discriminator:parsed[4]});
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


bot.on("roleDelete", delrole =>{
    if (delrole.guild){
    delrole.guild.defaultChannel.send(`The role "` + delrole.name +`" has been deleted.`)
    }
})

bot.on("channelCreate", createchnl =>{
    if (createchnl.guild){
    createchnl.guild.defaultChannel.send("Created new channel: " + createchnl)
}})
bot.on("channelDelete", delchnl =>{
if (delchnl.guild){
    delchnl.guild.defaultChannel.send("Deleted Channel: " + delchnl.name)
}
})
// create an event listener for messages
bot.on('message', message => {
    console.log("[" + message.channel.name + "] " + message.author.tag + "> " + message.content)
  // if the message is "ping",
   if (message.guild){
 if (message.content === "/ping"){
    let __START = Date.now();
    message.channel.send("Pinging...").then(m => {
      m.edit(`${pingmsg[Math.floor(Math.random()*pingmsg.length)]} \`Responded in: ${(Date.now()-__START)}ms.\``);
    });
  }
if (message.content.split(" ").indexOf("ai;") == 0){
        repeat = message.content.split(" ")
        if (message.author.id == config.ownerID){
        message.guild.defaultChannel.send(message.content.replace("ai;",""))
        message.delete()
        }
    }

if (message.content === "/randgame"){
    if (message.author.id == config.ownerID){
        bot.user.setGame(playingmsg[Math.floor(Math.random()*playingmsg.length)],1000*60*60)
        message.delete()
    }
    else message.channel.send("Only Shy can play with me...")
}

if (message.content === "bip"){
        message.channel.send("bop")
  }
if (message.content === "/HDButt"){
    message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/emojis/272396016332832768.png"]}).then(m => m.channel.stopTyping())}
}
if (message.content.split(' ').indexOf("/ava") == 0 ){
    var targetuser = message.mentions.users.first()
    if (targetuser){
        message.channel.send(targetuser.avatarURL)
        }
        else (message.channel.send("ERROR: You need to define someone..."))

    }
if (message.content.split(' ').indexOf("/setgame") == 0 ){
    if (message.author.id == config.ownerID){
        bot.user.setGame(message.content.replace('/setgame ',''))
        message.delete()
    }
        else{
            message.channel.send(message.author+", only Shy can play with me =(")
    }

}
if (message.content.toLowerCase().indexOf("porn.") >=0 && message.author.id != config.botID){
    message.channel.send(porntrigger[Math.floor(Math.random()*porntrigger.length)])
}
    if (message.content === "/commands"){
        var data = new Discord.RichEmbed()
            data.setColor("#191970")
            data.setTitle("COMMANDS")
            for(command of commands){
                data.addField(command.name , command.result)
            }
            message.author.send("", {embed:data})
        message.delete()
        if (message.member.roles.has(config.adminID)){
            var data = new Discord.RichEmbed()
              data.setColor("#FF0000")
            data.setTitle("ADMIN COMMANDS")
            for(command of admincmds){
                data.addField(command.name , command.result)
            }
            message.author.send("", {embed:data})
            message.channel.send("DM'd you the commands")
        }
    }
        if (message.content === "DM'd you the commands"){
            if (message.author.id == config.botID){
                delayedDelete(message)
                }
            }

    if (message.content === "/kys"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/attachments/268542019264184330/281635808518209537/full.png"]}).then(m => m.channel.stopTyping())
    }
//COMMAND: !punish
else if (message.content.split(' ').indexOf("/mute") == 0 ){
    if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).addRole("249616536573050900")
            message.channel.send(target + " has been muted...")
        } else {
            message.channel.send("ERROR: You need to define someone...")
        }}
        else {message.channel.send("Does it look like you're an admin?")}
}
else if (message.content.split(' ').indexOf("/unmute") == 0 ){
    if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).removeRole("249616536573050900")
            message.channel.send(target + " is no longer being gagged!")
            message.delete()
        } else {
            message.channel.send("ERROR: You need to define someone...")
        }}
        else {message.channel.send("Does it look like you're an admin?")}
}
if (message.content === "/RIP"){
    message.channel.send("Rest in piss, Furbot, L-BOT, and PVPCraft.\nI RULE THIS SERVER NOW!!!")
}
else if (message.content.split(" ").indexOf("/kick") == 0){
        if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
            var target = message.content.split(" ")[1]
            var targetuser = message.mentions.users.first()
                if(targetuser){
                    message.guild.member(targetuser).kick()
                    message.channel.send(target + " has been kicked in the ass..")
                    message.delete()
                }
                else message.channel.send("ERROR: You need to define someone...")
        }
        else message.channel.send("Does it look like you're an admin?")
    }
else if (message.content.split(" ").indexOf("/ban") == 0){
    if (message.member.roles.has(config.adminID)){
        let [command, user, ...reason] = message.content.split(" ");
        reason = reason || []
        reason = reason.join(" ")
        let guildMember = (message.mentions.members.size)?
        message.mentions.members.first() : message.guild.member(user)
        if (guildMember){
            guildMember.ban(`${message.author.tag}: ${reason}`).then(member => {
                   message.channel.send(`${user} has been banned by ${message.author} for ${reason};`)
                    message.delete()
            })}
        else{
          message.channel.send("This user isn't on the server.")
              }
    }
else{
        message.channel.send("Does it look like you're an admin?")
      }
}
    if (message.content === "/roledata"){
        console.log(message.guild.roles.entries())
        message.channel.send("Logging Role Data...")
    }
    if (message.content === "/loli"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/attachments/270372438825500672/281941724539125760/17_-_1_2.png"]}).then(m => m.channel.stopTyping())
    }
    else if (message.content.split(" ").indexOf("/say") == 0){
        repeat = message.content.split(" ")
        if (message.author.id == config.ownerID){
        message.channel.send(message.content.replace("/say",""))
        message.delete()
        }
        else (message.channel.send("Only Shy can tell me what to do.."))
    }
    if (message.content === "/hug"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/attachments/270372438825500672/281994810141835264/giphy.gif"]}).then(m => m.channel.stopTyping())
    }
    if (message.content === "/dicksize"){
        message.channel.send(size[Math.floor(Math.random()*size.length)])

    }
    if (message.content === "/myroles"){
        message.channel.send(message.author + "'s Roles:")
        message.channel.send(message.guild.member(message.author).roles.array().map(role => role.name.replace("@everyone","")))
    }
    if (message.content === "/loop"){
        if (message.author.id == config.ownerID | message.author.id == config.botID){
            message.channel.send("/loop")
        }
    else (message.channel.send("Nice try."))
    }
    if (message.content === "/owo"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/attachments/270372438825500672/283016856770576394/7224116065017216276_account_id8.png"]}).then(m => m.channel.stopTyping())
    }
    if (message.content === "/boop"){
        message.channel.send("", {files:[BoopImg[Math.floor(Math.random()*BoopImg.length)]]})
    }
    else if (message.content.split(" ").indexOf("/createrole") == 0){
        if (message.member.roles.has(config.adminID)){
        message.guild.createRole({name: message.content.replace("/createrole","")})
        message.channel.send(`A new role "`+ message.content.replace("/createrole","") + `" has been created.`)
        message.delete()
    }
    else (message.channel.send("Does it look like you're an admin?"))
    }
    else if (message.content.split(' ').indexOf("/adminify") == 0 ){
    if (message.author.id == config.ownerID){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).addRole(config.adminID)
            message.channel.send(target + " has become an admin!")
            message.delete()
        } else {
            message.channel.send("ERROR: You need to define someone...")
        }}
        else {message.channel.send("Now why the fuck would you be able to give someone admin?")}
}
    else if (message.content.split(" ").indexOf("/info") == 0){
        if (message.member.roles.has(config.adminID)){
            var target = message.content.split(" ")[1]
            var targetuser = message.mentions.users.first()
            if (targetuser){
                message.channel.send("User: " + targetuser.username + "\nID: "+ targetuser.id + "\nStatus: " + targetuser.presence.status + "\nAccount Created: "+ targetuser.createdAt + "\nAvatar URL: " + "<" + targetuser.avatarURL + ">" + "\nBot?: " + targetuser.bot)
            }
        }else message.channel.send("Do you look like an Admin?")
    }
    if (message.content === "/serverinfo"){
        message.channel.send("Name: " + message.guild.name + "\nOwner: " + message.guild.owner + "\nID: " + message.guild.id + "\nMembers: " + message.guild.memberCount + "\nIcon URL: <" + message.guild.iconURL + ">\nCreated: " + message.guild.createdAt + "\nFeatures: " +  message.guild.features + "\nRegion: " + message.guild.region + "\nVerification LVL: " + message.guild.verificationLevel + "\nThanks to GeneralUltra758 for teaching me how to bot.")
    }
    if (message.content === "/spin"){
        message.channel.send("Can't you read? This feature is a WIP.")
    }

     if (message.content === "/kill"){
     if (message.author.id == config.ownerID){
         message.channel.send("Shutting Down...").then(m => m.client.destroy().then(() => process.exit()))
}
else message.channel.send("Only Shy has permission to kill me...")
}
if (message.content == "/cat"){
    message.channel.send("http://thecatapi.com/api/images/get?format=src&type=gif&timestamp=" + Math.floor(Math.random()*9999999999999))
}
else if (message.content.split(' ').indexOf("/deadminify") == 0 ){
    if (message.author.id == config.ownerID){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).removeRole(config.adminID)
            message.channel.send(target + " is no longer admin...")
            message.delete()
        } else {
            message.channel.send("ERROR: You need to define someone...")
        }}
        else {message.channel.send("Now why the fuck would you be able to give someone admin?")}
}
    if (message.content === "/kawaiipuss"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/attachments/280250275342712833/286613607603765250/phil-jones-censored-pussy.jpg"]}).then(m => m.channel.stopTyping())
    }
if (message.content.split(" ").indexOf("/yt") == 0){
    youTube.search(message.content.replace("/yt",""), 10, function(error, result){
        if (result){
            var video = result
            if (video.items[0]){
            message.channel.send("https://www.youtube.com/watch?v=" + video.items[0].id.videoId)
        }
        else message.channel.send("ERROR: Nothing was found...")
        }
        else {
           message.channel.send(error)
        }

    })
}
    if (message.content === "https://www.youtube.com/watch?v=undefined"){
        if (message.author.id == config.botID){
            message.channel.send("ERROR: It appears the first result was not a video. Refine your search.")
            message.delete()
        }
    }
    if (message.content.split(" ").indexOf("/r34top") == 0){
               var cmd = message.content.replace("/r34top","")
        var eval = evalBooruCmd(cmd)
        booru.search("r34", eval.tags, {limit: 5, random: true})
        .then(booru.commonfy)
        .then(images => {
            var sorted = sortBooru(images,constrain(1,5,eval.number))
            for(let image of sorted){
            message.channel.send(`\`Rating: ${image.rating}\` \n\`Score: ${image.score}\` \n${image.file_url}`)
            }
        })
    }
    if (message.content.split(" ").indexOf("/r34") == 0){
        var cmd = message.content.replace("/r34","")
    var eval = evalBooruCmd(cmd)
    message.channel.startTyping()
    booru.search("r34", eval.tags, {limit: constrain(1,5,eval.number), random: true})
    .then(booru.commonfy)
    .then(images => {
        for (let image of images){
            message.channel.send(`\`Rating: ${image.rating}\` \n\`Score: ${image.score}\` \n${image.file_url}`)
        }
        message.channel.stopTyping()
    }).catch(() => {
      message.channel.send(`No images found.`).then(() => message.channel.stopTyping())
    });
  }
    if (message.content.split(" ").indexOf("/roles") == 0){
        var target = message.content.split(" ")[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
        message.channel.send(targetuser + "'s Roles:")
        message.channel.send(message.guild.member(targetuser).roles.array().map(role => role.name.replace("@everyone","")))
    }
    else message.channel.send("ERROR: You need to define someone...")
}
    if (message.content === "/sendnoods"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/attachments/270372438825500672/292342878737399809/26bf6ac5b31209915df332272bee1cb890f12c7617850b5b3acd45d68dba7ee9_1.jpg"]}).then(m => m.channel.stopTyping())
    }
    if (message.content === "/loodbat"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/attachments/270372438825500672/292342957107970049/503.png"]}).then(m => m.channel.stopTyping())
    }
    if (message.content === "/gudbat"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://cdn.discordapp.com/attachments/270372438825500672/292342957741178880/thumb.png"]}).then(m => m.channel.stopTyping())
    }
    if (message.content.split(" ").indexOf("/nickname") == 0){
        if (message.content.replace("/nickname", "").length > 32){
            message.channel.send("Unable to set nickname, it exceeds 32 characters")
        }
        else {message.guild.member(message.author).setNickname(message.content.replace("/nickname" , ""))
        message.channel.send(message.author.username + ", your name has been set")}
    }
    if (message.content.split(" ").indexOf("/purge") == 0){
        if (message.member.roles.has(config.adminID)){
        message.delete()
        message.channel.bulkDelete(message.content.replace("/purge",""))
        }
        else message.channel.send("Does it look like you're an admin?")
    }
    if (message.content === "/imagination"){
        message.channel.startTyping();
	message.channel.send("", {files:["https://lh3.googleusercontent.com/-AmxfRf7edKo/VSuNtOO1orI/AAAAAAAAFm8/ITrB-WsFVQ0/w368-h284/rainbow-is-love-glitter.gif"]}).then(m => m.channel.stopTyping())
    }
    if (message.content.toLowerCase().indexOf("<@281589030540279808>") >=0 && message.author.id != config.botID){
    message.channel.send(tagrespond[Math.floor(Math.random()*porntrigger.length)])
    }
})


bot.login(config.botToken)
