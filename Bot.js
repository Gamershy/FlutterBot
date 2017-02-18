const Discord = require('discord.js')
const config = require('./config.js')
const bot = new Discord.Client()
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
    "Don't forget the fags!"
]
const size = [
    "8================D",
    "8=====D",
    "8=D",
    "8========D",
    ".",
    "8=============D"
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
    "Asian Driver Simulator"
]

const pingmsg = [
    "Porn, I mean, Pong!",
    "Yeah yeah, I'm working.",
    "Pingpong.",
    "Yeah, cuz no other command could check that I'm working.",
    "ERROR: NotAVirus.exe succesfully pinged!",
    "What do you want.",
    "Can't you see I have something in slot 'V'??",
    "You better have a good reason for this.."
]



/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log("I am ready!")
  var timer = setInterval(()=>{bot.user.setGame(playingmsg[Math.floor(Math.random()*playingmsg.length)])},1000*60*15)
});

// create an event listener for messages
bot.on('message', message => {
  // if the message is "ping",
  if (message.content === "/ping"){ 
  message.channel.sendMessage("Pinging.. " + Date.now())

  }
   
if(message.content.split(' ').indexOf("Pinging..") == 0){
    var time = parseInt(message.content.replace("Pinging.. ",""))
    message.delete()
    message.channel.sendMessage(pingmsg[Math.floor(Math.random()*pingmsg.length)]+" `Responded in: " + (Date.now()-time)+ "ms`")
    }

  

if (message.content === "bip"){
        message.channel.sendMessage("bop")
  }
if (message.content === "/HDButt"){
    message.channel.sendFile("https://cdn.discordapp.com/emojis/272396016332832768.png")
}
else if (message.content.split(' ').indexOf("/ava") == 0 ){
    var target = message.content.split(' ')[1]
    var targetuser = message.mentions.users.first()
    if (targetuser){
        message.channel.sendMessage(targetuser.avatarURL)
        }
        else (message.channel.sendMessage("ERROR: You need to define someone..."))

    }
if (message.content.split(' ').indexOf("/setgame") == 0 ){
    if (message.author.id == config.ownerID){
        bot.user.setGame(message.content.replace('/setgame ',''))
        message.delete()
    }
        else{
            message.channel.sendMessage(message.author+", only Shy can play with me =(")
    }
            
}
if (message.content.toLowerCase().indexOf("porn") >=0 && message.author.id != config.botID){
    message.channel.sendMessage(porntrigger[Math.floor(Math.random()*porntrigger.length)])
}
    if (message.content === "/commands"){
        message.author.sendMessage("```/ping - see how fast she responds\n/HDButt - Butts in HD\n/ava @user - Responds with a full sized version of the mentioned user's avatar\n/kys\n/loli - ?\n/hug\n/myroles - Returns with a list of your roles\n-----\nADMIN ONLY\n/mute @user - mutes a user\n/kick @user - Kicks a user\n/ban @user - Bans a user\n/unmute @user - unmutes a user\n-----\nI know, it's all self explanitory. Blame Shy.```")
        message.delete()
    }
    if (message.content === "/kys"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/268542019264184330/281635808518209537/full.png")
    }
//COMMAND: !punish
else if (message.content.split(' ').indexOf("/mute") == 0 ){
    if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).addRole("249616536573050900")
            message.channel.sendMessage(target + " has been muted...")
            message.delete()
        } else {
            message.channel.sendMessage("ERROR: You need to define someone...")
        }}
        else {message.channel.sendMessage("Does it look like you're an admin?")}
}
else if (message.content.split(' ').indexOf("/unmute") == 0 ){
    if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).removeRole("249616536573050900")
            message.channel.sendMessage(target + " is no longer being gagged!")
            message.delete()
        } else {
            message.channel.sendMessage("ERROR: You need to define someone...")
        }}
        else {message.channel.sendMessage("Does it look like you're an admin?")}
}
if (message.content === "/RIP"){
    message.channel.sendMessage("Rest in piss, Furbot, L-BOT, and PVPCraft.\nI RULE THIS SERVER NOW!!!")
}
else if (message.content.split(" ").indexOf("/kick") == 0){
        if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
            var target = message.content.split(" ")[1]
            var targetuser = message.mentions.users.first()
                if(targetuser){
                    message.guild.member(targetuser).kick()
                    message.channel.sendMessage(target + " has been kicked in the ass..")
                    message.delete()
                }
                else message.channel.sendMessage("ERROR: You need to define someone...")
        }
        else message.channel.sendMessage("Does it look like you're an admin?")
    }
else if (message.content.split(" ").indexOf("/ban") == 0){
        if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
            var target = message.content.split(" ")[1]
            var targetuser = message.mentions.users.first()
                if(targetuser){
                    message.guild.member(targetuser).ban()
                    message.channel.sendMessage(target + " is retarded enough to be banned..")
                    message.delete()
                }
                else message.channel.sendMessage("ERROR: You need to define someone...")
        }
        else message.channel.sendMessage("Does it look like you're an admin?")
    }
    if (message.content === "/roledata"){
        console.log(message.guild.roles.entries())
        message.channel.sendMessage("Logging Role Data...")
    }
    if (message.content === "/loli"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/270372438825500672/281941724539125760/17_-_1_2.png")
    }
    else if (message.content.split(" ").indexOf("/say") == 0){
        repeat = message.content.split(" ")
        if (message.author.id == config.ownerID){
        message.channel.sendMessage(message.content.replace("/say",""))
        message.delete()
        }
    }
    if (message.content === "/hug"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/270372438825500672/281994810141835264/giphy.gif")
    }
    if (message.content === "/dicksize"){
        message.channel.sendMessage(size[Math.floor(Math.random()*size.length)])
    
    }
    if (message.content === "/myroles"){
        message.channel.sendMessage(message.author + "'s Roles:")
        message.channel.sendMessage(message.guild.member(message.author).roles.array().map(role => role.name.replace("@everyone","")))
    }
    if (message.content === "/loop"){
        if (message.author.id == config.ownerID | message.author.id == config.botID){
            message.channel.sendMessage("/loop")
        }
    else (message.channel.sendMessage("Nice try."))
    }
})

bot.login(config.botToken)
